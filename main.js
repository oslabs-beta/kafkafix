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
const fetch = require('node-fetch');

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
		? 'http://localhost:8080'
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

	win.loadURL('http://localhost:8080/partition');
}

ipcMain.on('open-partition', () => {
	createPartitionWindow();
});

function uploadFile() {
	// Resolves to a Promise<Object>
	dialog
		.showOpenDialog({
			title: 'Select your docker-compose file',
			defaultPath: path.join(__dirname, '../assets/'),
			buttonLabel: 'Select',
			filters: [
				{
					name: 'YML file',
					extensions: ['yml', 'yaml'],
				},
			],
			properties:
				process.platform !== 'darwin'
					? ['openFile']
					: ['openFile', 'openDirectory'],
		})
		.then(file => {
			// if file wasn't canceled
			if (!file.canceled) {
				const filePath = file.filePaths[0].toString();

				fetch('http://localhost:3000/api/composeup', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ filePath }),
				});

				// axios
				// 	.post('http://localhost:3000/api/composeup', {
				// 		filePath,
				// 	})
				// 	.catch(e =>
				// 		console.log('error in sending fetch request for file', e)
				// 	);
			}
			// else {
			// 	console.log('Error in reading file', err);
			// }
		});
	// .catch(e => console.log('error while selecting YAML => ', e));
}

// function to recive the message on click from the react app
ipcMain.on('upload-file', () => {
	uploadFile();
});
