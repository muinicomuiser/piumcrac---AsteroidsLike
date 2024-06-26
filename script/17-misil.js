class Misil{
    constructor(juego){
        this.juego = juego;
        this.nave = this.juego.nave;
        this.colores = this.juego.colores;
        this.vel = 30 + this.nave.vel.v;
        this.x = this.nave.x;
        this.y = this.nave.y;
        this.ang;
        this.radio = 5;
        this.activo = true;
        this.textoDisparo;
        this.selectorTexto;
        this.posicionTextoY = 20;
    }
    setAngulo(angulo){
        this.ang = angulo;
    }
    setEstado(estado){
        this.activo = estado;
    }
    setColor(colores){
        this.colores = colores;
    }
    getEstado(){
        return this.activo;
    }
    getPosicion(){
        return {x: this.x, y: this.y}
    }
    getRadio(){
        return this.radio;
    }
    getAngulo(){
        return this.ang;
    }
    dibujar(context){
        context.beginPath();
        context.fillStyle = this.colores.misil;
        context.arc(this.x, this.y, this.radio, 0, 2*Math.PI);
        context.fill();
    }
    mover(){
        this.x += this.vel*Math.cos(this.ang);
        this.y += this.vel*Math.sin(this.ang) * (-1);
    }
    actualizar(context){
        this.mover();   
        this.detectarBordes();
        this.dibujar(context);
    }
    detectarBordes(){
        if(this.x - this.radio > this.juego.width || this.x + this.radio < 0 || this.y - this.radio > this.juego.height || this.y + this.radio < 0){
            this.activo = false;
        }
    }       
}