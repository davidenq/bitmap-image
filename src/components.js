'use strict';
/* Module dependences */

var dec2hex = require('./helpers/dec2hex');
var hex2dec = require('./helpers/hex2dec');

var components = {};
var buffer;

var info = {
    signature : [0, 2],
    fileSize : [2, 6],
    reserved : [6, 10],
    dataOffset : [10, 14],
    size: [14, 18],
    width: [18, 22],
    height: [22, 26],
    planes: [26, 28],
    bitCount: [28, 30],
    compression: [30, 34],
    imageSize: [34, 38],
    xPixelsPerM: [38, 42],
    yPixelsPerM: [42, 46],
    colorsImportant: [46, 54]
};

exports = module.exports = components;

/*API public*/
components.readBufferStream = function(bufferStream) {
    buffer = bufferStream;
};

components.getInfo = function( parameter, convert ) {

    var type = convert || 'dec';

    var value = buffer.slice(info[parameter][0], info[parameter][1]);

    if(type === 'hex'){

        return value;
    }
    return hex2dec(reverse(value));
};

components.getColorTable = function() {

    var bytesRGB = buffer.slice(54, buffer.length);

    return bytesRGB;
};


/* API Private*/
var reverse = function ( buffer ) {

    var i;
    var invested = '';
    var size = buffer.length;
    
    for (i = size - 1; i >= 0; i--) {
        invested = invested.concat(dec2hex(buffer[i]));
    }

    return invested;
};