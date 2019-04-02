'use strict';

class Objet {

}

class Label {

}

class Joueur extends Object {

}

class Attaque {

}

class Jeu {
	constructor(controle) {
		this.controle = controle;
		this.connection = null;
	}

	reception(connection, info) {
		this.connection = connection;
	}

	envoie(objet, broadcast = false) {
		let type;
		if(broadcast && this.connection.isServer) {
			type = 'broadcast';
		}
		else if(!broadcast && this.connection.isServer) {
			type = 'response';
		}
		else {
			type = 'message';
		}
		this.connection.send(type, objet);
	}
}

class JeuClient extends Jeu {

}

class JeuServeur extends Jeu {

}

class Mur extends Object {

}

class Boule extends Object {

}

module.exports = { JeuClient, JeuServeur };