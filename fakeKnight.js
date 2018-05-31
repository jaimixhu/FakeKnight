//Fichero de JavaScript
window.onload = iniciar;

const WIDTH = 1000;
const HEIGHT = 800;
const CELDA = 30;
const MARGEN_X = 50;
const MARGEN_Y = 50;

var canvas;
var habitacionActiva;

function iniciar(){
	canvas = document.getElementById('canvas');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.ctx = canvas.getContext("2d");
	
	habitacionActiva = new Habitacion();
	habitacionActiva.dibujar();
	
}

class Habitacion{
	constructor(){
		//Ponemos medidas aleatorias
		this.ancho = aleatorio(10,30);
		this.alto = aleatorio(8,20);
		console.log(this.ancho, this.alto);
		
		//Cargamos las imágenes
		this.cargadas = 0;
		this.pared = cargarImagen("img/pared.png", this.carga.bind(this));
		this.baldosa1 = cargarImagen("img/baldosa1.png", this.carga.bind(this));
		this.baldosa2 = cargarImagen("img/baldosa2.png", this.carga.bind(this));
	}
	
	carga(){
		this.cargadas++;
	}
	
	dibujar(){
		if (this.cargadas < 3) {
			setTimeout(this.dibujar.bind(this), 100);
			return;
		}
		
		//Dibujar Pared norte
		for(let i = 0; i < this.ancho; i++)
			dibujar(this.pared, 0, 0, 29, 43, i * CELDA + MARGEN_X, MARGEN_Y + CELDA - 43);
		
		for(let i = 0; i < this.alto - 2; i++){
			dibujar(this.pared, 0, 0, 29, 43, MARGEN_X, MARGEN_Y + CELDA * (i+2) - 43);
			dibujar(this.pared, 0, 0, 29, 43, MARGEN_X + (this.ancho-1) * CELDA, MARGEN_Y + CELDA * (i+2) - 43);
		}
	
		//Poner baldosas
		for(let i = 1; i < this.alto - 1; i++)
			for(let j = 1; j < this.ancho - 1; j++){
				var baldosa;
				if (Math.random() < 0.7)
					baldosa = this.baldosa1;
				else
					baldosa = this.baldosa2;
				dibujar(baldosa, 0, 0, 30, 30, MARGEN_X + (CELDA * j), MARGEN_Y + (CELDA * i));
			}

		//Pared Sur	
		for(let i = 0; i < this.ancho; i++)
			dibujar(this.pared, 0, 0, 29, 43, i * CELDA + MARGEN_X, MARGEN_Y + CELDA * (this.alto) - 43);
	
	}
}


//Funciones Auxiliares
function dibujar(img, x1Img, y1Img, x2Img, y2Img, xCanvas, yCanvas){
    canvas.ctx.drawImage(img, x1Img, y1Img, x2Img - x1Img, y2Img - y1Img, xCanvas, yCanvas, (x2Img - x1Img), (y2Img - y1Img));   
}

function aleatorio(min, max){
	return Math.floor(Math.random()*(max-min)) + min;
}

function cargarImagen(fichero, callback){
	var imagen = new Image();
	imagen.src = fichero;
	imagen.onload = callback;
	return imagen;
}










