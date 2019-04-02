'use strict';

let bootstrapElements = require('../bootstrapElement');
const { BrowserWindow } = require('electron').remote;

class EntreeJeu {
	constructor(controle, document) {
		this.controle = controle;
		this.startButton = null;
		this.connectButton = null;
		this.ipAddressField = null;
		this.message = null;

		let defaultIP = '127.0.0.1';

		// get main
		let main = document.querySelector('main');

		// create row list
		let rows = [];

		let row = bootstrapElements.row('div', document);
		row.style.height = '10px';

		rows.push(row);

		// create new row
		row = bootstrapElements.row('div', document);

		// create col list for the last row
		let cols = [];

		// create new col
		let col = bootstrapElements.col('div', document, bootstrapElements.SM, 8);
		col.innerHTML = 'Start a server:';
		cols.push(col);
		// end col

		// create new col
		col = bootstrapElements.col('div', document, bootstrapElements.SM, 4);
		this.startButton = bootstrapElements.button(document, 'Start', '', 'start');
		col.append(this.startButton);
		cols.push(col);
		// end col

		// add cols to row
		cols.forEach(col => row.append(col));

		// add row to rows
		rows.push(row);

		// create new row
		row = bootstrapElements.row('div', document);

		// create col list
		cols = [];

		// create new col
		col = bootstrapElements.col('div', document, bootstrapElements.SM, 12);
		col.innerHTML = 'Connect an existing server:';
		cols.push(col);
		// end col

		// add cols to row
		cols.forEach(col => row.append(col));

		// add row to rows
		rows.push(row);

		// create a 5px height row
		row = bootstrapElements.row('div', document);
		row.style.height = '10px';

		// add row to rows
		rows.push(row);

		// create new row
		row = bootstrapElements.row('div', document);

		// create new col
		col = bootstrapElements.col('div', document, bootstrapElements.SM, 8);
		this.ipAddressField = bootstrapElements.inputText(document, 'IP Server:', defaultIP, '', 'server-ip');
		col.append(this.ipAddressField);
		row.append(col);
		// end col

		// create new col
		col = bootstrapElements.col('div', document, bootstrapElements.SM, 4);
		let subrow = bootstrapElements.row('div', document);
		let subcol = bootstrapElements.col('div', document, bootstrapElements.SM, 12);
		this.connectButton = bootstrapElements.button(document, 'Connect', '', 'connect');
		subcol.append(this.connectButton);
		subrow.append(subcol);
		subcol = bootstrapElements.col('div', document, bootstrapElements.SM, 12);
		subcol.style.height = '10px';
		subrow.append(subcol);
		subcol = bootstrapElements.col('div', document, bootstrapElements.SM, 12);
		let exitButton = bootstrapElements.button(document, 'Exit', '', 'exit');
		subcol.append(exitButton);
		subrow.append(subcol);
		col.append(subrow);
		row.append(col);
		// end row

		// add row to rows
		rows.push(row);

		row = bootstrapElements.row('div', document);
		this.message = bootstrapElements.col('div', document, bootstrapElements.SM, 12);
		row.append(this.message);

		rows.push(row);

		// add rows to main
		rows.forEach(row => main.append(row));

		this.startButton.addEventListener('click', () => this.btnStart_click());

		exitButton.addEventListener('click', this.btnExit_click);

		this.connectButton.addEventListener('click', () => this.btnConnect_click());
	}

	btnStart_click() {
		this.controle.evenementVue(this, "serveur");
	}

	btnConnect_click() {
		this.controle.evenementVue(this, this.ipAddressField.value);
	}

	btnExit_click() {
		require('../constants').resetConstants();
		BrowserWindow.getFocusedWindow().close();
	}
}

class ChoixJoueur {

}

class Arene {
	constructor(controle, document) {
		this.controle = controle;
	}
}

module.exports = { EntreeJeu, ChoixJoueur, Arene };