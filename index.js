
//Cargando libreria
var color = require('./src/color');
var buffer = require('./src/helpers/loadBuffer');

//Cargando buffer de las imágenes
var bufferImg1 = buffer.get('4');
var bufferImg2 = buffer.get('3');


color.generate({
    buffer: {
        left: bufferImg1,
        right: bufferImg2
    },
    type: '3D'
});

color.generate({
    buffer: bufferImg1,
    model: 'yuv'
});

color.generate({
    buffer: bufferImg1,
    color: 'blue'
});