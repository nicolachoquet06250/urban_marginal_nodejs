'use strict';

module.exports.button = (document, value, classAdded = [], id = null) => {
	let button = document.createElement('input');
	button.setAttribute('type', 'button');
	if(id) button.setAttribute('id', id);
	if(classAdded) classAdded.forEach(classe => button.classList.add(classe));
	button.setAttribute('value', value);
	return button;
};

module.exports.htmlButton = (document, html, classAdded = [], id = null) => {
	let button = document.createElement('button');
	button.setAttribute('type', 'button');
	button.setAttribute('value', html);
	if(id) button.setAttribute('id', id);
	if(classAdded) classAdded.forEach(classe => button.classList.add(classe));
	return button;
};

module.exports.inputText = (document, placeholder = '', value = '', classAdded = [], id = null) => {
	let input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('placeholder', placeholder);
	input.value = value;
	if(id) input.setAttribute('id', id);
	if(classAdded) classAdded.forEach(classe => input.classList.add(classe));
	return input;
};