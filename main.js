'use strict';

const { main } = require('./src/modules/functions-for-main-script');
const {app, BrowserWindow} = require('electron');

main(app, BrowserWindow);