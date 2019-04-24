const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const lookpath = require('lookpath');
const { execSync } = require('child_process');
const path = require('path');

const __main__ = () => {
  const win = new BrowserWindow({
    width: 780,  minWidth: 780,
    height: 480, minHeight: 400,
    x: 40, y: 40,
  });
  win.loadURL(`file://${__dirname}/dist/index.html`)

  ipcMain.on('file', async (ev, input) => {
    const destdir = input.dest;
    if (input.type === 'audio/mp3') {
      console.log(1000);
      return fs.copyFileSync(input.path, path.join(destdir, path.basename(input.path)));
    }
    if (!fs.existsSync(input.path)) {
      console.log(2000);
      return ev.sender.send('failed');
    }
    const ffmpeg = await lookpath('ffmpeg');
    if (!ffmpeg) {
      console.log(3000);
      return ev.sender.send('failed');
    }
    input.path = input.path.replace(/(\s+)/g, '\\$1');
    const destpath = path.join(destdir, path.basename(input.path).replace(path.extname(input.path), '.mp3'));
    console.log(input.path, destpath);
    console.log(ffmpeg);
    execSync(`${ffmpeg} -i ${input.path} ${destpath}`);
  });
};

app.on('ready', __main__);
app.on('window-all-closed', () => app.quit());
