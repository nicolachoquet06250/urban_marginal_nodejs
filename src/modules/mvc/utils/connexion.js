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
		this.recepteur = recepteur;
		this.port = port;

		this.server = require('socket.io')(this.port);

		this.server.of('/urban_marginal').on('connection', socket => {
			console.log('un client s\'est connecté');
			socket.emit('response', 'Vous êtes bien connecté !');
			socket.broadcast.emit('broadcast', 'Un client vient de se connecter !');

			// message reception gestion
			socket.on('message', message => {
				console.log(message);
				socket.emit('response', 'tu m\'à envoyé ' + message);
			});

			// client disconnect gestion
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

	send(type, message) {
		if(type === Connection.RESPONSE) {
			this.sendResponse(message);
		}
		else if(type === Connection.BROADCAST) {
			this.sendResponseOnBroadcast(message);
		}
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

	construct(ip, port, recepteur) {
		this.ip = ip;
		this.port = port;
		this.recepteur = recepteur;
		let io = require('socket.io-client');

		// connection
		this.client = io.connect(`http://${ip}:${port}/urban_marginal`);

		// response server reception gestion
		this.client.on('response', message => {
			console.log(message);
		});

		// broadcast message reception gestion
		this.client.on('broadcast', message => {
			console.log('broadcast: ' + message);
		});

		return this;
	}

	sendMessage(message) {
		this.client.emit('message', message);
	}

	send(type, message) {
		if(Connection.MESSAGE) this.sendMessage(message);
	}

	constructor() {
		this.port = null;
		this.ip = null;
		this.client = null;
	}
}

class Connection {
	static get BROADCAST() {
		return 'broadcast';
	}

	static get MESSAGE() {
		return 'message';
	}

	static get RESPONSE() {
		return 'response';
	}

	get isServer() {
		return this.socket instanceof ServeurSocket;
	}

	constructor(socket, recepteur) {
		this.recepteur = recepteur;
		this.socket = socket;
	}

	send(message, type = 'broadcast') {
		this.socket.send(type, message);
	}
}

module.exports = { ClientSocket: ClientSocket, ServerSocket: ServeurSocket };
