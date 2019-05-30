const { app, BrowserWindow, ipcMain } = require('electron');
const { lookpath } = require('lookpath');
const { spawn } = require('child_process');
const path = require('path');

async function processJob(ev, job, win) {
  const stdlog = (payload) => win.webContents.send('stdio-log', payload);
  for (let i = 0; i < job.entries.length; i++) {
    job.entries[i].status = 'processing';
    win.webContents.send('job-update', job);
    job.entries[i] = await processEntry(job.entries[i], job.outdir, stdlog);
    win.webContents.send('job-update', job);
  }
};

async function processEntry(entry, outdir, stdlog) {
  const destext = '.mp3'; // FIXME:
  const destpath = path.join(outdir, path.basename(entry.path).replace(path.extname(entry.path), destext));
  const converted = await convertFormat(entry, destpath, stdlog);
  return converted;
}

async function convertFormat(entry, destpath, stdlog) {
  const ffmpeg = await lookpath('ffmpeg');
  return new Promise(resolve => {
    const cmd = spawn(ffmpeg, ['-y', '-i', entry.path, destpath], { stdio: ['ignore', 'pipe', 'pipe'] });
    cmd.stdout.on('data', (chunk) => stdlog({type: 'stdout', data: chunk.toString()}));
    cmd.stderr.on('data', (chunk) => stdlog({type: 'stderr', data: chunk.toString()}));
    cmd.on('close', (code) => resolve({
      ...entry,
      status: code == 0 ? 'done' : 'error',
      name: path.basename(destpath),
    }));
  });
}

async function detectBPM(entry, destpath, stdlog) {
  const ffmpeg = await lookpath('ffmpeg');
  return new Promise(resolve => {
    const cmd = spawn(ffmpeg, ['-y', '-i', entry.path, destpath], { stdio: ['ignore', 'pipe', 'pipe'] });
    cmd.stdout.on('data', (chunk) => stdlog({type: 'stdout', data: chunk.toString()}));
    cmd.stderr.on('data', (chunk) => stdlog({type: 'stderr', data: chunk.toString()}));
    cmd.on('close', (code) => resolve({ ...entry, status: code == 0 ? 'done' : 'error' }));
  });
}

const __main__ = () => {
  const win = new BrowserWindow({
    width: 1080,  minWidth: 900,
    height: 920, minHeight: 480,
    x: 20, y: 20,
  });
  win.loadURL(`file://${__dirname}/dist/index.html`)
  ipcMain.on('job-start', (ev, args) => processJob(ev, args, win));
};

app.on('ready', __main__);
app.on('window-all-closed', () => app.quit());
