'use strict';
var fs = require('fs');
var path = require('path');

var image = {};

exports = module.exports = image;

image.get = function (nameBMP){

    var pathImg =  path.join(__dirname, '../../','/input');

    var buffer = fs.readFileSync(pathImg+'/'+nameBMP+'.bmp');

    return buffer;
};
