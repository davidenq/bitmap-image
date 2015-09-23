bitmap-image
===================
Un modulo para node.js que obtiene, de una imagen en formato BMP, las componentes de color RED, BLUE, GREEN, CIAN, MAGENTA, YELLOW, o el modelo de color YUV, o una imagen estereoscópica(3D) a partir de dos imágenes desplazas una distancia entre si.

### Requisitos

Antes de probar el modulo es necesario que tenga instalado nodejs en su sistema operativo.

Instalación en windows
> [Nodejs en Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows)

Instalación en linux (Diferentes distribuciones)
> [Nodejs en Linux](https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager?utm_source=[deliciuos]&utm_medium=twitter)

###Obtener el código fuente
Hay dos vías para obtener el código fuente de la aplicación:

1. Utilizando la línea de comandos: (Es necesario primero [instalar](https://git-scm.com/book/es/v1/Empezando-Instalando-Git) y [configurar](https://git-scm.com/book/es/v1/Empezando-Configurando-Git-por-primera-vez) git)

    1.1. Ingresar a la línea de comandos (cmd en windows o terminal en linux).
    1.2. Ejecutar las siguientes instrucciones en la línea de comandos
    > \>  git clone https://github.com/davidenq/bitmap-image
       \> cd bitmap-image

2. Descargando el código fuente

 En esta misma página, descargar el código fuente del modulo seleccionando el boton *Download ZIP*
Una vez que haya descargado o clonado el código fuente, ingrese a la carpeta donde guardo el modulo y descomprima el archivo zip.

###Estructura de archivos del modulo

```
├── bitmap-image/
│   ├── input /
│   ├── output /
│   ├── src /
│   │   ├── helpers/
│   │   │   ├── dec2hex.js/
│   │   │   ├── generateImage.js/
│   │   │   ├── hex2dec.js/
│   │   ├── color.js/
│   │   ├── components.js/
│   ├── README.md/
│   ├── index.js/
```

- `input` es la carpeta donde estarán almacenadas las imágenes originales
- `output` en esta carpeta se generarán las imágenes resultantes
- `src` Esta carpeta contiene todo el código fuente para procesar la imagen bmp. Dentro de esta carpeta se encuentran:
 * La carpeta `helpers`  que contiene  tres archivos, cada uno con pequeños fragmentos de código para convertir información de decimal a hexadecimal y viceversa (`dec2hex.js` y `hex2dec.js`) y para generar la salida de la imagen resultante (`generateImage.js`)
 * El archivo  `color.js` contiene todo el código fuente para procesar la imagen y obtener las componentes de color(R, G, B; C, M, Y), o el modelo YUV o la imágen 3D.
 * El archivo `components.js` se encarga de obtener cada bloque de bits de la imagen BMP.

- ` index.js` Es el archivo donde se especificarán las configuraciones para procesar la imagen

### ¿Cómo probar?
1. Ingrese al terminal en linux o cmd en windows y vaya a la ruta donde se encuentra la carpeta del código fuente.

2. Ejecutar el comando:

 * ` node index.js`

3. Ver el resultado generado dentro de la carpeta output contenida en la carpeta del código fuente.

###Ejemplos de configuración y uso del modulo

El modulo esta configurado de tal manera que permita especificar de forma sencilla, dentro del archivo `index.js`, tanto la imagen que será procesada, así como la imagen resultante que se desea obtener. A continuación se muestran algunos ejemplos.

*Despues de realizar la configuración ejecutar desde el terminal el comando `node index.js` *

>**nota**: en color se puede especificar las siguientes componentes de color:
 - blue
 - red
 - green
 - cian
 - yellow
 - magenta

Ejemplo 1: Generando una imagen con la componente de color azul de la imagen original
```js
//Cargar la imagen que será procesada
var bufferImg = buffer.get('nombre_de_la_imagen');

//Obtener la componente de color azul de la imagen
color.generate({
    buffer: bufferImg,
    color: 'blue'
});
```

Ejemplo 2: Generando una imagen con la componente de color cian de la imagen original
```js
//Cargar la imagen que será procesada
var bufferImg = buffer.get('nombre_de_la_imagen');

//Obtener la componente de color azul de la imagen
color.generate({
    buffer: bufferImg,
    color: 'cian'
});
```


Ejemplo 3: Generando una imagen  con el modelo de color YUV de la imagen original.
```js
//Cargar la imagen que será procesada
var bufferImg = buffer.get('nombre_de_la_imagen');

//Obtener la componente de color azul de la imagen
color.generate({
    buffer: bufferImg,
    model: 'yuv'
});
```

Ejemplo 4: Obteniendo una imagen estereoscópica a partir de dos imágenes(tener en cuenta que las dos imágenes tienen que tener un desplazamiento horizontal en  centimetros o milimetros, entre si. Este desplazamiento depende de la visión. Para mayor información del desplazamiento de las imágenes puede visitar el siguiente enlace [imágenes estereoscópicas](https://es.wikipedia.org/wiki/Estereoscop%C3%ADa))
```js
//Cargar la imagen que será procesada
var bufferImgLeft = buffer.get('nombre_de_la_imagen_uno');
var bufferImgRight = buffer.get('nombre_de_la_imagen_dos_desplazada');

//Obtener la componente de color azul de la imagen
color.generate({
    buffer: {
        left: bufferImgLeft,
        right: bufferImgRight
    }
    type: '3D'
});
```

Adicionalmente se pueden especificar otros parámetros adiciones como por ejemplo un nombre a la imagen resultante o no generar ninguna imagen resultante y únicamente trabajar con el buffer resultante que retorna la aplicación.

Ejemplo 5: Obteniendo el modelo de color YUV de la imagen original y especificando un nombre a la imagen resultante
```js
//Cargar la imagen que será procesada
var bufferImg = buffer.get('nombre_de_la_imagen');

//Obtener la componente de color azul de la imagen
color.generate({
    buffer: bufferImg,
    model: 'yuv',
    name: 'imagen-yuv'
});
```

Ejemplo 6: Obteniendo el buffer del modelo de color YUV de la imagen original y mostrando el resultado en el terminal
```js
//Cargar la imagen que será procesada
var bufferImg = buffer.get('nombre_de_la_imagen');

//Obtener la componente de color azul de la imagen
var resultado = color.generate({
    buffer: bufferImg,
    model: 'yuv',
    image: false
});

console.log(resultado);
```

###Licencia



The MIT License (MIT)

Copyright (c) 2015 [David Núñez, @davidenq](http://davidenq.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

