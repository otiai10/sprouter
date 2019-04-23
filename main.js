const { app, BrowserWindow } = require('electron');

const __main__ = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 480,
    x: 40, y: 40,
  });
  win.loadURL(`file://${__dirname}/dist/index.html`)
};

app.on('ready', __main__);
app.on('window-all-closed', () => app.quit());
