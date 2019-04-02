'use strict';

module.exports = (confTitles, mainWindow = null, loadingWindow = null) => {
    let { app, BrowserWindow } = require('electron');

    let conf = require('./configs');

    let mainOnDomReady = () => {
        loadingWindow.hide();
        loadingWindow.close();
        mainWindow.show();
    };
    let loadingOnShow = () => {
        if (conf.debug) console.log('debug: ' + (conf.debug ? 'true' : 'false'));
        mainWindow = new BrowserWindow(conf[confTitles.main]);
        mainWindow.setMenuBarVisibility(false);
        mainWindow.webContents.once('dom-ready', mainOnDomReady);
        mainWindow.loadFile(`src/index.html`);
    };
    let createWindow = () => {
        loadingWindow = new BrowserWindow(conf[confTitles.loading]);

        loadingWindow.once('show', loadingOnShow);

        loadingWindow.loadFile(`src/loader.html`);
        loadingWindow.show();
    };
    let appOnWindowAllClosed = () => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
    };
    let appOnActivate = () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            createWindow()
        }
    };

    app.on('ready', createWindow);
    app.on('window-all-closed', appOnWindowAllClosed);
    app.on('activate', appOnActivate);
};