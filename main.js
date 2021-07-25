const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const url = require('url');
const path = require('path');
const fetch = require('node-fetch');
const isDev = require('electron-is-dev');

app.whenReady().then(() => createWindow());

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

// ipcMain.on('open-partition', () => createPartitionWindow());
ipcMain.on('upload-file', () => uploadFile());

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

// 	win.loadURL(
// 		url.format({
// 			pathname: path.join(__dirname, './build/index.html'),
// 			protocol: 'file:',
// 			slashes: true,
// 		})
// 	);
// };

// const createPartitionWindow = () => {
// 	const win = new BrowserWindow({
// 		width: 500,
// 		height: 500,
// 	});

  const startURL = isDev
    ? 'http://localhost:8080'
    : `file://${path.join(__dirname, './client/src/index.html')}`;

  win.loadURL(startURL);

	// win.loadURL('http://localhost:8080/partition');
};

const uploadFile = () => {
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
				const options = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ filePath }),
				};

				fetch('http://localhost:3000/api/composeup', options).catch(e =>
					console.log('error: docker compose up', e)
				);
			}
		});
};
