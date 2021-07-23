const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const fetch = require('node-fetch');

function createWindow() {
	const win = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			// preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	const startURL = isDev
		? 'http://localhost:8080'
		: `file://${path.join(__dirname, './client/src/index.html')}`;

	win.loadURL(startURL);
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	app.on('window-all-closed', function () {
		if (process.platform !== 'darwin') app.quit();
	});
});

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
	dialog
		.showOpenDialog({
			title: 'Select docker-compose file',
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
			if (!file.canceled) {
				const filePath = file.filePaths[0].toString();

				fetch('http://localhost:3000/api/composeup', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ filePath }),
				}).catch(e => console.log('error from fetch', e));
			}
		});
}

ipcMain.on('upload-file', () => {
	uploadFile();
});
