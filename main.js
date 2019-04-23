const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const lookpath = require('lookpath');
const { execSync } = require('child_process');
const path = require('path');

const __main__ = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 480,
    x: 40, y: 40,
  });
  win.loadURL(`file://${__dirname}/dist/index.html`)

  ipcMain.on('file', async (ev, source) => {
    const destdir = '/Users/otiai10/Desktop'; // FIXME
    if (source.type === 'audio/mp3') {
      console.log(1000);
      return fs.copyFileSync(source.path, path.join(destdir, path.basename(source.path)));
    }
    if (!fs.existsSync(source.path)) {
      console.log(2000);
      return ev.sender.send('failed');
    }
    const ffmpeg = await lookpath('ffmpeg');
    if (!ffmpeg) {
      console.log(3000);
      return ev.sender.send('failed');
    }
    source.path = source.path.replace(/(\s+)/g, '\\$1');
    const destpath = path.join(destdir, path.basename(source.path).replace(path.extname(source.path), '.mp3'));
    console.log(source.path, destpath);
    console.log(ffmpeg);
    execSync(`${ffmpeg} -i ${source.path} ${destpath}`);
  });
};

app.on('ready', __main__);
app.on('window-all-closed', () => app.quit());
