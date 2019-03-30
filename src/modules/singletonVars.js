'use strict';
let ServerSocket = require('./mvc/utils/connexion').ServerSocket;
let ClientSocket = require('./mvc/utils/connexion').ClientSocket;

module.exports = {
	utils: {
		connexion: {
			ServerSocket,
			ClientSocket
		}
	}
};