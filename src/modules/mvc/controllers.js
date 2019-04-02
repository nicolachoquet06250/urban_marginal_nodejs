'use strict';

const { EntreeJeu } = require('./views');

class Global {

}

class Controle {
	constructor(document) {
		this.port = 8010;
		this.frmEntreeJeu = new EntreeJeu(this, document);
		this.serverSocket = null;
		this.clientSocket = null;
		this.frame = null;
		this.jeu = null;
		this.isServer = false;
	}

	get socket() {
		return this.isServer ? this.serverSocket : this.clientSocket;
	}

	evenementVue(frame, info) {
		this.frame = frame;
		if(typeof frame === 'object' && frame instanceof EntreeJeu) {
			this.evenementEntreeJeu(info)
		}
		else {
			console.log(info);
		}
	}

	evenementEntreeJeu(info) {
		const { JeuClient, JeuServeur } = require('./models');
		if(info === 'serveur') {
			this.serverSocket = require('../modules').Singletons.utils.connexion.ServerSocket.Instance.construct(this, this.port);
			this.frmEntreeJeu.message.innerHTML = '<b>vous êtes le serveur</b>';
			this.frmEntreeJeu.connectButton.style.display = 'none';
			this.isServer = true;
			this.jeu = new JeuServeur(this);
			this.frmEntreeJeu.btnExit_click();
		}
		else {
			this.clientSocket = require('../modules').Singletons.utils.connexion.ClientSocket.Instance.construct(info, this.port, this);
			this.frmEntreeJeu.message.innerHTML = '<b>vous êtes un client</b>';
			this.frmEntreeJeu.startButton.style.display = 'none';
			this.isServer = false;
			this.jeu = new JeuClient(this);
		}
	}
}

module.exports = { Global, Controle };