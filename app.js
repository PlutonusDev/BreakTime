'use strict';
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const { is } = require('electron-util');
const unhandled = require('electron-unhandled');
const contextMenu = require('electron-context-menu');

unhandled();
contextMenu();

app.setAppUserModelId('com.plutonusdev.BreakTime');

if (!is.development) {
	const FOUR_HOURS = 1000 * 60 * 60 * 4;
	setInterval(() => {
		autoUpdater.checkForUpdates();
	}, FOUR_HOURS);

	autoUpdater.checkForUpdates();
}

// Prevent window from being garbage collected
let mainWindow;

const createMainWindow = async () => {
	const win = new BrowserWindow({
		title: app.getName(),
		webPreferences: {
			nodeIntegration: true
		},
		alwaysOnTop: true,
		show: false,
		width: 500,
		height: 500
	});

	win.on('ready-to-show', () => {
		win.show();
	});

	win.on('closed', () => {
		mainWindow = undefined;
	});

	await win.loadFile(path.join(__dirname, 'index.html'));

	return win;
};

if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

app.on('window-all-closed', () => {
	if (!is.macos) {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
		mainWindow.setKiosk(true);
	}
});

(async () => {
	await app.whenReady();
	mainWindow = await createMainWindow();
	mainWindow.setKiosk(true);
	mainWindow.setMenu(null);
	mainWindow.on('blur', () => {
		mainWindow.restore();
		mainWindow.focus();
		mainWindow.setKiosk(true);
	});
})();
