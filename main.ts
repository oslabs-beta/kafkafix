// requiring in app and browser window modules
const { app, BrowserWindow } = require('electron');

// importing electron is dev
const isDev = require('electron-is-dev');

// requring in path
const path = require('path');

// function for creating a window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // if in dev mode - use local host:9000, if not use index.html
  // if (isDev) {
  //   console.log('Electron is in DEV MODE YOMA');
  // } else {
  //   console.log('Its not working haha');
  // }
  const startURL = isDev
    ? 'http://localhost:9000'
    : `file://${path.join(__dirname, './client/src/index.html')}`;

  // loading the html file
  win.loadURL(startURL);
}

app.whenReady().then(() => {
  // calling the function above
  createWindow();

  // activating the app when no windows are available opens a new one
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // closes app when all windows are closed - for windows/linux
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
  });
});
