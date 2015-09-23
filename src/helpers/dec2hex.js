'use strict';

/**
 * @package bitmap-image
 * @author David Núñez
 * @license https://github.com/davidenq/bitmap-image/blob/master/LICENSE
 */

var dec2hex = (function() {

    function dec2hex(dec) {
        return dec.toString(16);
    }

    return {
        dec2hex: dec2hex
    };

}());

module.exports = dec2hex.dec2hex;