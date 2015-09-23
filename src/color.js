'use stricts';

var img = require('./helpers/generateImage');
var component = require('./components');
var Buffer = require('buffer').Buffer;

var channel =  {};

/* Constantes para convertir  RGB a ChromaU */
var ChromaU = {
	RED: -0.148,
	GREEN: -0.291,
	BLUE: 0.439
};

/* Constantes para convertir RGB a ChromaV */
var ChromaV = {
	RED: 0.439,
	GREEN: -0.368,
	BLUE: -0.071
};

/* Constantes para convertir RGB a Luma */
var Luma = {
	RED: 0.257,
	GREEN: 0.504,
	BLUE: 0.098
};

exports = module.exports = channel;

/*API public*/

channel.generate = function (info){

	var bufferImg = info.buffer;
	var color = info.color;
	var name = info.name;
	var image = info.image || true;
	var model = info.model;
	var type = info.type;

	if(model == 'yuv'){
		
		var luma = processImg(bufferImg, 'luma', name, false);
		var chromaU = processImg(bufferImg, 'chromaU', name, false);
		var chromaV = processImg(bufferImg, 'chromaV', name, false);

		var components = {
			luma: luma,
			chromaU: chromaU,
			chromaV: chromaV
		};

		return processImg(bufferImg, model, name, true, components);

	}else if( type == '3D'){

		var red = processImg(bufferImg.left, 'red', name, false);
		var cian = processImg(bufferImg.right, 'cian', name, false);

		var components = {
			red: red,
			cian: cian
		};
		
		return processImg(bufferImg.left, type, name, true, components);

	}else{

		return processImg(bufferImg, color, name, image); 
	}
};

/* API private */

/*
	Formula para conversión de las componentes del modelo RGB a las componentes del modelo YCbCr
	'
	' coefficients                Rec.601 Rec.709 FCC
	' Rc : Red channel constant    0.299   0.2125  0.3
	' Gc : Green channel constant  0.587   0.7154  0.59
	' Bc : Blue channel constant   0.114   0.0721  0.11
	'
	' Estandar Rec.601 es utilizado
	'
	'
	' y = (Rc*219/255)*R + (Gc*219/255)*G + (Bc*219/255)*B +16;
	' u = - Rc*112/255*r/(1-Bc) - Kg*112/255*G/(1-Bc) + 112/255*B + 128
	' v = 112/255*R - Gc*112/255*G/(1-Rc) - Kb*112/255*B/(1-Rc) +128
	' 
	' 
	' para mayor información :
	'
	' http://www.avisynth.org/mediawiki/wiki/Color_conversions
	' http://www.intersil.com/data/an/an9717.pdf
*/

/**
 * processImg Permite generar componentes de color(Red, Green, Blue, Cian, Magenta, Yellow), modelo de color YUV e imagen estereoscópica
 * @param  {buffer} bufferImg  Contiene el buffer de la imagen
 * @param  {string} color      El nombre del color o modelo que se generará
 * @param  {string} name       Nombre que se utilizará para guardar la imagen
 * @param  {bool}   image      Si se genera o no una imágen
 * @param  {object} components Contiene componentes de color según corresponda la seleccion de la imágen
 * @return {buffer}            Retorna el buffer de la imagen generada
 */
var processImg = function (bufferImg, color, name, image, components) {

	component.readBufferStream(bufferImg);

	var width = component.getInfo('width');
	var height = component.getInfo('height');

	var COUNT = 54; // El valor de 54 es porque es el tamaño de la cabecera de una imagen BMP
	var sizeBuffer = COUNT + 3*width; // Dado que la imagen BMP contiene información para cada color distribuidos
	//en 24 bits, 8 bits por cada color, es necesario especificar el tamaño total de los bits que contendrá el buffer.

	var channelBuffer = new Buffer(bufferImg.length); //channelBuffer almacenará los bits de información del canal seleccionado.

	/*Se llena las primeras 54 posiciones de channelBuffer con la información original de la imagen*/
	for( var i = 0; i < 54; i++){
		channelBuffer[i] = bufferImg[i];
	}

	/*Se recorre una matriz considerando el tamaño de las filas y columnas de la imagen original para generar
	la nueva imagen con el color especificado*/
	for( var j = 0; j<height; j++){
		for( i = COUNT; i <= sizeBuffer; i++){
			if(color == 'blue'){
				channelBuffer[i] = bufferImg[i];
				channelBuffer[++i] = 0;
				channelBuffer[++i] = 0;
			}else if(color == 'green'){
				channelBuffer[i] = 0;
				channelBuffer[++i] = bufferImg[i];
				channelBuffer[++i] = 0;
			}else if( color == 'red'){
				channelBuffer[i] = 0;
				channelBuffer[++i] = 0;
				channelBuffer[++i] = bufferImg[i];
			}else if(color == 'cian'){
				channelBuffer[i] = bufferImg[i];
				channelBuffer[++i] = bufferImg[i];
				channelBuffer[++i] = 0;
			}else if(color == 'magenta'){
				channelBuffer[i] = bufferImg[i];
				channelBuffer[++i] = 0;
				channelBuffer[++i] = bufferImg[i];
			}else if(color == 'yellow'){
				channelBuffer[i] = 0;
				channelBuffer[++i] = bufferImg[i];
				channelBuffer[++i] = bufferImg[i];
			}else if(color == 'chromaU'){
				var chromaU = ChromaU.RED*bufferImg[i+2] + ChromaU.GREEN*bufferImg[i+1] + ChromaU.BLUE*bufferImg[i] + 128;
				channelBuffer[i] = chromaU;
				channelBuffer[++i] = chromaU;
				channelBuffer[++i] = chromaU;
			}else if(color == 'chromaV'){
				var chromaV = ChromaV.RED*bufferImg[i+2] + ChromaV.GREEN*bufferImg[i+1] + ChromaV.BLUE*bufferImg[i] + 128;
				channelBuffer[i] = chromaV;
				channelBuffer[++i] = chromaV;		
				channelBuffer[++i] = chromaV;				
			}else if(color == 'luma'){
				var luma = Luma.RED*bufferImg[i+2] + Luma.GREEN*bufferImg[i+1] + Luma.BLUE*bufferImg[i] + 16;
				channelBuffer[i] = luma;
				channelBuffer[++i] = luma;		
				channelBuffer[++i] = luma;	
			}else if(color == 'yuv'){
				channelBuffer[i] = components.luma[i];
				channelBuffer[++i] = components.chromaU[i-1];		
				channelBuffer[++i] = components.chromaV[i-2];
			}else if(color == '3D'){				
				channelBuffer[i] = components.cian[i+1];
	            channelBuffer[++i] = components.cian[i];
	            channelBuffer[++i] = components.red[i];
			}
		}

		while ( bufferImg[sizeBuffer] === 0){
			channelBuffer[sizeBuffer] = 0;
			sizeBuffer++;
		}

		COUNT = sizeBuffer;
		sizeBuffer = COUNT + 3*width;
	}

	if(image){
		if(!name){
			name = 'picture';  
		}
		img.generate(channelBuffer, name + '-' + color);
	}

	return channelBuffer;
};
