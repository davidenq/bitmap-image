'use strict';
var fs = require('fs');
var image = {};

exports = module.exports = image;

image.generate = function (buffer, nameFile){

	var stream = fs.createWriteStream('./output/' + nameFile +'.bmp');
	
	stream.once('open', function() {

	  stream.write(buffer);
	  stream.end();

	});
}
