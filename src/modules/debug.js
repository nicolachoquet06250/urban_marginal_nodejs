'use strict';

let addDebugButton = () => {
	require('./constants').setConstant('tmp.debugButton', true);
	document.querySelectorAll('.top-bar').forEach(elem => {
		let button = document.createElement('button');
		button.setAttribute('type', 'button');
		button.classList.add('devtools');
		button.innerHTML = 'DebTools';

		elem.append(button);
	});
};

module.exports = app => {
	let conf = require('./configs');

	let constants = require('./constants');

	if(!constants.exists('tmp.debugButton') || !constants.getConstant('tmp.debugButton')) {
		addDebugButton();
	}

	let dev_tools_buttons = document.querySelectorAll(".top-bar .devtools");

	if (conf.debug) {
		dev_tools_buttons.forEach(button => {
			button.addEventListener("click", () => {
				app.BrowserWindow.getFocusedWindow().openDevTools()
			});
		});
	} else {
		dev_tools_buttons.forEach(button => {
			button.style.display = 'none';
		});
	}
};