'use strict';
let fs = require('fs');

let constants_path = `${__dirname}/tmp/constants_${process.pid}.json`;

let createRecursiveDir = path => {
	let dirs = path.split('/');
	let completePath = '/';
	for(let i in dirs) {
		let dir = dirs[i];
		if (dir.indexOf('.') === -1) {
			completePath += `/${dir}`;
			if (!fs.existsSync(`${completePath}`)) {
				fs.mkdirSync(`${completePath}`);
			}
		}
	}
};
let deleteRecursiveDir = path => {
	let dirs = path.split('/');
	for(let i = dirs.length; i > 0; i--) {
		delete dirs[i];
		if (dirs[i] !== undefined && dirs[i].indexOf('.') === -1) {
			fs.rmdirSync(`${dirs.join('/')}`);
		}
	}
};

let getConstants = () => {
	createRecursiveDir(constants_path);
	if (fs.existsSync(constants_path)) {
		return JSON.parse(fs.readFileSync(constants_path));
	} else {
		fs.writeFileSync(constants_path, JSON.stringify({
			tmp: {
				debugButton: false
			},
			argv: null,
			singletons: {
				ServerSocket: null,
				ClientSocket: null
			}
		}));
		getConstants();
	}
};

let getConstant = key => {
	let keys = key.split('.');
	let constants = getConstants();
	let constant = null;
	eval(`constants.${keys.join('.')} !== undefined ? constant = constants.${keys.join('.')} : null;`);
	return constant;
};

let exists = key => {
	let keys = key.split('.');
	let constants = getConstants();
	let exists = null;
	eval(`exists = constants.${keys.join('.')} !== undefined ? true : false`);
	return exists;
};

let setConstant = (key, value) => {
	let keys = key.split('.');
	let constants = getConstants();
	eval(`let constants = getConstants(); 
	constants.${keys.join('.')} = value;
	require('fs').writeFileSync(constants_path, JSON.stringify(constants))`);
};

let resetConstants = () => {
	if(constants_path !== '/' && fs.existsSync(constants_path)) {
		fs.unlinkSync(constants_path);
		deleteRecursiveDir(constants_path);
	}
};

module.exports = {
	getConstants,
	getConstant,
	setConstant,
	exists,
	resetConstants
};