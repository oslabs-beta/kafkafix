"use strict";
// requiring in app and browser window modules
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
// importing electron is dev
var isDev = require('electron-is-dev');
// requring in path
var path = require('path');
// function for creating a window
function createWindow() {
    var win = new BrowserWindow({
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
    var startURL = isDev
        ? 'http://localhost:9000'
        : "file://" + path.join(__dirname, './client/src/index.html');
    // loading the html file
    win.loadURL(startURL);
}
app.whenReady().then(function () {
    // calling the function above
    createWindow();
    // activating the app when no windows are available opens a new one
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
    // closes app when all windows are closed - for windows/linux
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin')
            app.quit();
    });
});
