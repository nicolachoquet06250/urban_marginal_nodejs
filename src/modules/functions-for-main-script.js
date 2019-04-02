'use strict';


module.exports.main = () => {
	let getLoadingConf = () => {
		let conf = require('./configs');

		return conf.loadingConfigs;
	};
	let getMainConf = () => {
		let conf = require('./configs');

		return  conf.mainConfig;
	};
	//
	// let mainOnDomReady = () => {
	// 	loading.hide();
	// 	loading.close();
	// 	mainWindow.show();
	// };
	// let loadingOnShow = () => {
	// 	if (getMainConf().debug) console.log('debug: ' + (getMainConf().debug ? 'true' : 'false'));
	// 	mainWindow = new BrowserWindow(getMainConf());
	// 	mainWindow.setMenuBarVisibility(false);
	// 	mainWindow.webContents.once('dom-ready', mainOnDomReady);
	// 	mainWindow.loadFile(`src/index.html`);
	// };
	// let createWindow = () => {
	// 	loading = new BrowserWindow(getLoadingConf());
	//
	// 	loading.once('show', loadingOnShow);
	//
	// 	loading.loadFile(`src/loader.html`);
	// 	loading.show();
	// };
	// let appOnWindowAllClosed = () => {
	// 	// On macOS it is common for applications and their menu bar
	// 	// to stay active until the user quits explicitly with Cmd + Q
	// 	if (process.platform !== 'darwin') {
	// 		app.quit()
	// 	}
	// };
	// let appOnActivate = () => {
	// 	// On macOS it's common to re-create a window in the app when the
	// 	// dock icon is clicked and there are no other windows open.
	// 	if (mainWindow === null) {
	// 		createWindow()
	// 	}
	// };
	//
	// app.on('ready', createWindow);
	// app.on('window-all-closed', appOnWindowAllClosed);
	// app.on('activate', appOnActivate);
	let create = require('./createWindow');

	create({
		main: 'mainConfig',
		loading: 'loadingConfigs'
	});
};