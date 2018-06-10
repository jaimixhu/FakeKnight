//Fichero de JavaScript
window.onload = iniciar;

const WIDTH = 1000;
const HEIGHT = 800;
const CELDA = 30;
const MARGEN_X = 50;
const MARGEN_Y = 50;
const T_REDIBUJO = 1000/24;

var canvas;
var habitacionActiva;
var velX = 0;
var velY = 0;
var desplazamientoX = 0;
var desplazamientoY = 0;
var personaje;

function iniciar(){
	canvas = document.getElementById('canvas');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.ctx = canvas.getContext("2d");
	
	habitacionActiva = new Habitacion();
	habitacionActiva.dibujar();
	
	personaje = new Personaje();
	personaje.dibujar();
	
	//Capturamos los eventos de teclado
	window.onkeydown = pulsar;
	window.onkeyup = soltar;
	
	//Activamos el refresco
	setTimeout(redibujar, T_REDIBUJO);
}

function pulsar(evento){
	switch(evento.key){
		case "S":
		case "s":
			velY = -5;
			break;
		case "W":
		case "w":
			velY = 5;
			break;
		case "A":
		case "a":
			velX = 5;
			break;
		case "D":
		case "d":
			velX = -5;
			break;		
	}
	
	evento.preventDefault();
	evento.stopPropagation();
}

function soltar(evento){
	switch(evento.key){
		case "S":
		case "s":
		case "W":
		case "w":
			velY = 0;
			break;
		case "A":
		case "a":
		case "D":
		case "d":
			velX = 0;
			break;
	}
	evento.preventDefault();
	evento.stopPropagation();
}

function redibujar(){
	desplazamientoX += velX;
	desplazamientoY += velY;
	
	canvas.ctx.clearRect(0, 0, WIDTH, HEIGHT);
	canvas.ctx.translate(velX,velY);
	
	habitacionActiva.dibujar();
	personaje.dibujar();
	
	setTimeout(redibujar, T_REDIBUJO);
}

class Personaje{
	constructor(){
		//Cargamos laa imagen
		this.cargada = false;
		this.imagen = cargarImagen("img/asesino.png", this.carga.bind(this));
		this.imagen.ancho = 30;
		this.imagen.alto = 30;
	}
	
	carga(){
		this.cargada = true;
	}
	
	dibujar(){
		if (!this.cargada) {
			setTimeout(this.dibujar.bind(this), 100);
			return;
		}
		var x = WIDTH/2 - desplazamientoX;
		var y = HEIGHT/2 - desplazamientoY;
		dibujar(this.imagen, 0, 0, this.imagen.ancho, this.imagen.alto, x, y);	
	}
}

class Habitacion{
	constructor(){
		//Ponemos medidas aleatorias
		this.ancho = aleatorio(10,30);
		this.alto = aleatorio(8,20);
		
		//Cargamos las imágenes
		this.cargadas = 0;
		this.pared = cargarImagen("img/pared.png", this.carga.bind(this));
		this.pared.ancho = 30;
		this.pared.alto = 43;
		this.baldosa1 = cargarImagen("img/baldosa1.png", this.carga.bind(this));
		this.baldosa1.ancho = 30;
		this.baldosa1.alto = 30;
		this.baldosa2 = cargarImagen("img/baldosa2.png", this.carga.bind(this));
		this.baldosa2.ancho = 30;
		this.baldosa2.alto = 30;
		
		//Creamos la matriz de elementos
		this.celdas = [];
		//Creamos la pared norte
		this.celdas[0] = [];
		for(let i = 0; i < this.ancho; i++)
			this.celdas[0][i] = this.pared;
		//Creamos las paredes laterales
		for(let i = 1; i < this.alto - 1; i++){
			this.celdas[i] = [];
			this.celdas[i][0] = this.pared;
			
			//Baldosas
			for(let j = 1; j < this.ancho - 1; j++){
				var baldosa;
				if (Math.random() < 0.7)
					baldosa = this.baldosa1;
				else
					baldosa = this.baldosa2;
				this.celdas[i][j] = baldosa;
			}
			
			this.celdas[i][this.ancho - 1] = this.pared;
		}
		//Creamos la pared sur
		this.celdas[this.alto - 1] = [];
		for(let i = 0; i < this.ancho; i++)
			this.celdas[this.alto - 1][i] = this.pared;
	}
	
	carga(){
		this.cargadas++;
	}
	
	dibujar(){
		if (this.cargadas < 3) {
			setTimeout(this.dibujar.bind(this), 100);
			return;
		}
		
		for(let i = 0; i < this.alto; i++)
			for (let j = 0; j < this.ancho; j++)
				dibujar(this.celdas[i][j], 0, 0, this.celdas[i][j].ancho, this.celdas[i][j].alto, MARGEN_X + CELDA * j, MARGEN_Y + CELDA * i - this.celdas[i][j].alto);
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










