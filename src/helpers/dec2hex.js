'use strict';

var dec2hex = (function() {

    function dec2hex(dec) {
        return dec.toString(16);
    }

    return {
        dec2hex: dec2hex
    };

}());

module.exports = dec2hex.dec2hex;