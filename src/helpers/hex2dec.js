'use strict';

/**
 * @package bitmap-image
 * @author David Núñez
 * @license https://github.com/davidenq/bitmap-image/blob/master/LICENSE
 */

var hex2dec = (function() {

    function hex2dec(hex) {
        return parseInt(hex, 16);
    }

    return {
        hex2dec: hex2dec
    };

}());

module.exports = hex2dec.hex2dec;