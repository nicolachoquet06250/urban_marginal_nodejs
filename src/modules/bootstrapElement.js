'use strict';

let htmlElements = require('./htmlElement');

let createElement = (document, tagName, classAdded = '', id = null) => {
	let element = document.createElement(tagName);
	if(classAdded) element.classList.add(classAdded);
	if(id) element.setAttribute('id', id);
	return element;
};

const XS = '';
const SM = 'sm';
const MD = 'md';
const LG = 'lg';

module.exports.XS = XS;
module.exports.SM = SM;
module.exports.MD = MD;
module.exports.LG = LG;

module.exports.createElement = createElement;

module.exports.container = (tagName, document) => createElement(document, tagName, 'container');

module.exports.containerFluid = (tagName, document) => createElement(document, tagName, 'container-fluid');

module.exports.row = (tagName, document) => createElement(document, tagName, 'row');

module.exports.col = (tagName, document, deviceSize = XS, colsNumber = 1) => createElement(document, tagName, `col-${deviceSize}${deviceSize === XS ? '' : '-'}${colsNumber}`);

module.exports.button = (document, value = '', classAdded = [], id = null) => {
	if(classAdded) {
		if(typeof classAdded === 'object' && classAdded instanceof Array) {
			classAdded.push('btn');
			classAdded.push('btn-primary');
		}
		else {
			classAdded += 'btn btn-primary';
			classAdded = classAdded.split(' ');
		}
	}
	else {
		classAdded = 'btn btn-primary';
		classAdded = classAdded.split(' ');
	}
	return htmlElements.button(document, value, classAdded, id);
};

module.exports.htmlButton = (document, html = '', classAdded = [], id = null) => {
	if(classAdded) {
		if(typeof classAdded === 'object' && classAdded instanceof Array) {
			classAdded.push('btn');
			classAdded.push('btn-primary');
		}
		else {
			classAdded += 'btn btn-primary';
			classAdded = classAdded.split(' ');
		}
	}
	else {
		classAdded = 'btn btn-primary';
		classAdded = classAdded.split(' ');
	}
	return htmlElements.htmlButton(document, html, classAdded, id);
};

module.exports.inputText = (document, placeholder = '', value = '', classAdded = [], id = null) => {
	if(classAdded) {
		if(typeof classAdded === 'object' && classAdded instanceof Array) {
			classAdded.push('form-control');
		}
		else {
			classAdded += 'form-control';
			classAdded = classAdded.split(' ');
		}
	}
	else {
		classAdded = 'form-control';
		classAdded = classAdded.split(' ');
	}

	return htmlElements.inputText(document, placeholder, value, classAdded, id);
};