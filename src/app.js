'use strict';

const debug = false;

const path = require('path');
const {app, BrowserWindow} = require('electron');
//const {autoUpdater} = require('electron-updater');	Not ready for use.
const {is} = require('electron-util');
const unhandled = require('electron-unhandled');
const contextMenu = require('electron-context-menu');

if(debug) {
	const edebug = require('electron-debug');
	edebug();
}

unhandled();
contextMenu();

app.setAppUserModelId('com.plutonusdev.BreakTime');

app.setLoginItemSettings({
	openAtLogin: true
});

/*if (!is.development) {
	const FOUR_HOURS = 1000 * 60 * 60 * 4;
	setInterval(() => {
		autoUpdater.checkForUpdates();
	}, FOUR_HOURS);

	autoUpdater.checkForUpdates();
}*/

// Prevent window from being garbage collected
let mainWindow;

const createMainWindow = async () => {
	const win = new BrowserWindow({
		title: app.getName(),
		webPreferences: {
			nodeIntegration: true
		},
		alwaysOnTop: !debug,
		show: false,
		width: 1,
		height: 1
	});

	win.on('ready-to-show', () => {
		win.show();
	});

	win.on('closed', () => {
		mainWindow = undefined;
	});

	await win.loadFile(path.join(__dirname, '/pages/index.html'));

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
		mainWindow.setKiosk(!debug);
	}
});

(async () => {
	await app.whenReady();
	mainWindow = await createMainWindow();
	mainWindow.setKiosk(!debug);
	mainWindow.setMenu(null);
	mainWindow.on('blur', () => {
		mainWindow.restore();
		mainWindow.focus();
		mainWindow.setKiosk(!debug);
	});
})();

require("./service");