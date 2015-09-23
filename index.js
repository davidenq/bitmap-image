
/**
 * @package bitmap-image
 * @author David Núñez
 * @license https://github.com/davidenq/bitmap-image/blob/master/LICENSE
 */

//Cargando libreria
var color = require('./src/color');
var buffer = require('./src/helpers/loadBuffer');

//Cargando buffer de las imágenes
var bufferImg = buffer.get('especificar_el_nombre_de_la_imagen');

//Ejemplos
color.generate({
    buffer: bufferImg,
    model: 'yuv'
});

color.generate({
    buffer: bufferImg,
    color: 'blue'
});