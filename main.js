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
      try {
        fs.copyFileSync(input.path, path.join(destdir, path.basename(input.path)));
        return ev.sender.send('success', {message: `File copied`});
      } catch (error) {
        return ev.sender.send('error', {message: `Exit code ${error.status}:\n${error.message}`});
      }
    }
    if (!fs.existsSync(input.path)) {
      return ev.sender.send('error', { message: `Input file not found: ${input.path}`});
    }
    const ffmpeg = await lookpath('ffmpeg');
    if (!ffmpeg) {
      return ev.sender.send('error', { message: `ffmpeg executable not found: ${ffmpeg}`});
    }
    input.path = input.path.replace(/(?=[() ])/g, '\\');
    const destpath = path.join(destdir, path.basename(input.path).replace(path.extname(input.path), '.mp3'));
    try {
      const cmd = `${ffmpeg} -y -i ${input.path} ${destpath}`; // TODO: shell injection
      execSync(cmd);
      return ev.sender.send('success', {message: `Good:\n${cmd.split(' ').join('\n')}`});
    } catch (error) {
      return ev.sender.send('error', {message: `Exit code ${error.status}:\n${error.message}`});
    }
  });
};

app.on('ready', __main__);
app.on('window-all-closed', () => app.quit());
