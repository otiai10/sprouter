const { app, BrowserWindow, ipcMain } = require('electron');
const { lookpath } = require('lookpath');
const { spawn } = require('child_process');
const path = require('path');

async function processJob(ev, job, win) {
  const stdlog = (payload) => win.webContents.send('stdio-log', payload);
  for (let i = 0; i < job.entries.length; i++) {
    const result = await processEntry(job.entries[i], job.outdir, stdlog);
    job.entries[result.index] = {...result};
    win.webContents.send('job-update', job);
  }
};

async function processEntry(entry, outdir, stdlog) {
  const destext = '.mp3'; // FIXME:
  const destpath = path.join(outdir, path.basename(entry.path).replace(path.extname(entry.path), destext));
  const ffmpeg = await lookpath('ffmpeg');
  return new Promise(resolve => {
    const cmd = spawn(ffmpeg, ['-y', '-i', entry.path, destpath], { stdio: ['ignore', 'pipe', 'pipe'] });
    cmd.stdout.on('data', (chunk) => stdlog({type: 'stdout', data: chunk.toString()}));
    cmd.stderr.on('data', (chunk) => stdlog({type: 'stderr', data: chunk.toString()}));
    cmd.on('close', (code) => {
      entry.status = code == 0 ? 'done' : 'error';
      resolve(entry);
    });
  });
}

const __main__ = () => {
  const win = new BrowserWindow({
    width: 780,  minWidth: 780,
    height: 480, minHeight: 400,
    x: 40, y: 40,
  });
  win.loadURL(`file://${__dirname}/dist/index.html`)
  ipcMain.on('job-start', (ev, args) => processJob(ev, args, win));
};

app.on('ready', __main__);
app.on('window-all-closed', () => app.quit());
