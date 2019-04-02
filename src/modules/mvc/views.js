'use strict';

let bootstrapElements = require('../bootstrapElement');
const { BrowserWindow } = require('electron').remote;

class EntreeJeu {
	constructor(document, controle) {
		this.controle = controle;
		this.document = document;
		this.startButton = null;
		this.connectButton = null;
		this.ipAddressField = null;
		this.message = null;

		let defaultIP = '127.0.0.1';

		// get main
		let main = this.document.querySelector('main');

		// create row list
		let rows = [];

		let row = bootstrapElements.row('div', this.document);
		row.style.height = '10px';

		rows.push(row);

		// create new row
		row = bootstrapElements.row('div', this.document);

		// create col list for the last row
		let cols = [];

		// create new col
		let col = bootstrapElements.col('div', this.document, bootstrapElements.SM, 8);
		col.innerHTML = 'Start a server:';
		cols.push(col);
		// end col

		// create new col
		col = bootstrapElements.col('div', this.document, bootstrapElements.SM, 4);
		this.startButton = bootstrapElements.button(this.document, 'Start', '', 'start');
		col.append(this.startButton);
		cols.push(col);
		// end col

		// add cols to row
		cols.forEach(col => row.append(col));

		// add row to rows
		rows.push(row);

		// create new row
		row = bootstrapElements.row('div', this.document);

		// create col list
		cols = [];

		// create new col
		col = bootstrapElements.col('div', this.document, bootstrapElements.SM, 12);
		col.innerHTML = 'Connect an existing server:';
		cols.push(col);
		// end col

		// add cols to row
		cols.forEach(col => row.append(col));

		// add row to rows
		rows.push(row);

		// create a 5px height row
		row = bootstrapElements.row('div', this.document);
		row.style.height = '10px';

		// add row to rows
		rows.push(row);

		// create new row
		row = bootstrapElements.row('div', this.document);

		// create new col
		col = bootstrapElements.col('div', this.document, bootstrapElements.SM, 8);
		this.ipAddressField = bootstrapElements.inputText(this.document, 'IP Server:', defaultIP, '', 'server-ip');
		col.append(this.ipAddressField);
		row.append(col);
		// end col

		// create new col
		col = bootstrapElements.col('div', this.document, bootstrapElements.SM, 4);
		let subrow = bootstrapElements.row('div', this.document);
		let subcol = bootstrapElements.col('div', this.document, bootstrapElements.SM, 12);
		this.connectButton = bootstrapElements.button(this.document, 'Connect', '', 'connect');
		subcol.append(this.connectButton);
		subrow.append(subcol);
		subcol = bootstrapElements.col('div', this.document, bootstrapElements.SM, 12);
		subcol.style.height = '10px';
		subrow.append(subcol);
		subcol = bootstrapElements.col('div', this.document, bootstrapElements.SM, 12);
		let exitButton = bootstrapElements.button(this.document, 'Exit', '', 'exit');
		subcol.append(exitButton);
		subrow.append(subcol);
		col.append(subrow);
		row.append(col);
		// end row

		// add row to rows
		rows.push(row);

		row = bootstrapElements.row('div', this.document);
		this.message = bootstrapElements.col('div', this.document, bootstrapElements.SM, 12);
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

}

module.exports = { EntreeJeu, ChoixJoueur, Arene };