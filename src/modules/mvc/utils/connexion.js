'use strict';

let constants = require('../../constants');

class ServeurSocket {
	/**
	 * @returns ServeurSocket
	 * @constructor
	 */
	static get Instance() {
		if(!constants.getConstant('singletons.ServerSocket')) {
			constants.setConstant('singletons.ServerSocket', new ServeurSocket().Instance(true));
		}
		return ServeurSocket.unserialize(constants.getConstant('singletons.ServerSocket'));
	}

	Instance(serialized = false) {
		return serialized ? this.serialize() : this;
	}

	construct(recepteur, port) {
		let http = require('http');

		this.recepteur = recepteur;
		this.port = port;

		// Chargement du fichier index.html affiché au client
		let  server = http.createServer();

		let io = require('socket.io').listen(server);

		io.sockets.on('connection', socket => {
			console.log('un client s\'est connecté');
			socket.emit('message', 'Vous êtes bien connecté !');
		});

		server.listen(port);

		return this;
	}

	constructor() {
		this.recepteur = null;
		this.port = null;
	}

	serialize() {
		return {
			type: 'singleton',
			package: 'mvc.utils',
			class: 'ServeurSocket',
			data: this
		};
	}

	static unserialize(data) {
		let obj = new ServeurSocket();
		obj.construct(data.recepteur, data.port);
		return obj;
	}
}

class ClientSocket {
	/**
	 * @returns ClientSocket
	 * @constructor
	 */
	static get Instance() {
		if(!constants.getConstant('singletons.ClientSocket')) {
			constants.setConstant('singletons.ClientSocket', new ClientSocket().Instance(true));
		}
		return ClientSocket.unserialize(constants.getConstant('singletons.ClientSocket'));
	}

	Instance(serialized = false) {
		return serialized ? this.serialize() : this;
	}

	construct(ip, port) {
		this.ip = ip;
		this.port = port;
		let io = require('socket.io-client');
		let socket = io.connect(`http://${ip}:${port}`);
		socket.on('message', socket => {
			console.log(socket);
		});
		return this;
	}

	constructor() {
		this.port = null;
		this.ip = null;
	}

	serialize() {
		return {
			type: 'singleton',
			package: 'mvc.utils',
			class: 'ClientSocket',
			data: this
		};
	}

	static unserialize(data) {
		let obj = new ClientSocket();
		obj.construct(data.ip, data.port);
		return obj;
	}
}

module.exports = { ClientSocket: ClientSocket, ServerSocket: ServeurSocket };
