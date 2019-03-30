'use strict';

const { EntreeJeu } = require('./views');

class Global {

}

class Controle {
	constructor(document) {
		this.port = 8010;
		this.frmEntreeJeu = new EntreeJeu(document, this);
		this.serverSocket = null;
		this.clientSocket = null;
		this.frame = null;
	}

	evenementVue(frame, info) {
		this.frame = frame;
		if(typeof frame === 'object' && frame instanceof EntreeJeu) {
			console.log('coucou');
			this.evenementEntreeJeu(info)
		}
		else {
			console.log('coucou1');
			console.log(info);
		}
	}

	evenementEntreeJeu(info) {
		if(info === 'serveur') {
			this.serverSocket = require('../modules').Singletons.utils.connexion.ServerSocket.Instance.construct(this, this.port);
			this.frmEntreeJeu.message.innerHTML = '<b>vous êtes le serveur</b>';
		}
		else {
			this.clientSocket = require('../modules').Singletons.utils.connexion.ClientSocket.Instance.construct(info, this.port);
			this.frmEntreeJeu.message.innerHTML = '<b>vous êtes un client</b>';
		}
	}
}

module.exports = { Global, Controle };