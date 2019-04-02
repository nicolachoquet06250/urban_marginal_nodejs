'use strict';

class ServeurSocket {
	/**
	 * @returns ServeurSocket
	 * @constructor
	 */
	static get Instance() {
		return new ServeurSocket();
	}

	construct(recepteur, port) {
		// let http = require('http');

		this.recepteur = recepteur;
		this.port = port;

		// Chargement du fichier index.html affiché au client
		// let  server = http.createServer();

		// this.server = require('socket.io').listen(server);
		this.server = require('socket.io')(this.port);

		this.server.of('/urban_marginal').on('connection', socket => {
			console.log('un client s\'est connecté');
			socket.emit('response', 'Vous êtes bien connecté !');
			socket.broadcast.emit('broadcast', 'Un client vient de se connecter !');

			socket.on('message', message => {
				console.log(message);
				socket.emit('response', 'tu m\'à envoyé ' + message);
			});

			socket.on('disconnect', () => {
				alert('un utilisateur est déconnecté');
				socket.broadcast.emit('broadcast', 'un utilisateur est déconnecté');
			});
		});

		return this;
	}

	sendResponse(message) {
		this.server.emit('response', message);
	}

	sendResponseOnBroadcast(message) {
		this.server.broadcast.emit('broadcast', message);
	}

	constructor() {
		this.recepteur = null;
		this.port = null;
		this.server = null;
	}
}

class ClientSocket {
	/**
	 * @returns ClientSocket
	 * @constructor
	 */
	static get Instance() {
		return new ClientSocket();
	}

	construct(ip, port) {
		this.ip = ip;
		this.port = port;
		let io = require('socket.io-client');

		this.client = io.connect(`http://${ip}:${port}/urban_marginal`);

		this.client.on('response', message => {
			console.log(message);
		});

		this.client.on('broadcast', message => {
			console.log('broadcast: ' + message);
		});

		return this;
	}

	sendMessage(message) {
		this.client.emit('message', message);
	}

	constructor() {
		this.port = null;
		this.ip = null;
		this.client = null;
	}
}

class Connection {
	constructor(socket, recepteur) {
		this.recepteur = recepteur;
	}
}

module.exports = { ClientSocket: ClientSocket, ServerSocket: ServeurSocket };
