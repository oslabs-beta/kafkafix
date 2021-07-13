// requiring in app and browser window modules
const { app, BrowserWindow, ipcMain } = require('electron');
// import IPCmain from electron

// importing electron is dev
const isDev = require('electron-is-dev');

// requring in path
const path = require('path');

// importing electron, formdata, axios and fs modules
const { dialog } = require('electron');
const fs = require('fs');
// const FormData = require('form-data');
const axios = require('axios').default;

// function for creating a window
function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

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

// fucntion for creating partition window
function createPartitionWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
  });

  win.loadURL('http://localhost:9000/partition');
}

ipcMain.on('open-partition', () => {
  createPartitionWindow();
});

function uploadFile() {
  // first we need to get the filePath, then send it to backend

  // if using Windows or Linux
  if (process.platform !== 'darwin') {
    // Resolves to a Promise<Object>
    dialog
      .showOpenDialog({
        title: 'Select your docker-compose file',
        defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Upload',
        // Restricting the user to only YML Files.
        filters: [
          {
            name: 'YML file',
            extensions: ['yml'],
          },
        ],
        // Specifying the File Selector Property
        properties: ['openFile'],
      })
      .then((file) => {
        // if file wasn't canceled
        if (!file.canceled) {
          const filePath = file.filePaths[0].toString();
          console.log(filePath);

                axios
                  .post('http://localhost:3000/api/dockerfile', {
                    filepath: filePath,
                  })
                  .catch((e) =>
                    console.log('error in sending fetch request for file', e)
                  );
              } else {
                console.log('Error in reading file', err);
              }
            }).catch((e) => console.log('error in upload => ', e));
          }
  // if using MacOS
  else {
    dialog
      .showOpenDialog({
        title: 'Select your docker-compose file',
        defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Upload',
        // Restricting the user to only YML Files.
        filters: [
          {
            name: 'YML file',
            extensions: ['yml'],
          },
        ],
        // Specifying the File Selector and Directory selector Property In macOS
        properties: ['openFile', 'openDirectory'],
      })
      .then((file) => {
        if (!file.canceled) {
          const filePath = file.filePaths[0].toString();
          console.log(filePath);
          
                axios
                  .post('http://localhost:3000/api/dockerfile', {
                    filepath: filePath,
                  })
                  .catch((e) =>
                    console.log('error in sending fetch request for file', e)
                  );
              } else {
                console.log('Error in reading file', err);
              }
            }).catch((e) => console.log('error in uplaoding file', e));
          }
        }

// function to recive the message on click from the react app
ipcMain.on('upload-file', () => {
  uploadFile();
});
