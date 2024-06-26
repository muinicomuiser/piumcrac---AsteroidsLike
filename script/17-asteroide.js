class Asteroide{
    constructor(juego){
        this.juego = juego;
        this.colores = this.juego.colores;
        this.x;
        this.y;
        this.sector;
        this.radio = 60;
        this.vel = {x: 0, y:0};
        this.estado = 1; //Cuando explota pasa a dos (con dos asteroides repetido en estado 2, cuando explota cada uno pasa a 3, y si es 3 desaparecen)
        this.activo = true;
        this.puntos = 100;
    }
    sectorOrigen(numRandom){
        this.sector = Math.floor(numRandom * 4);
    }
    setColores(colores){
        this.colores = colores;
    }
    dibujar(context){
        context.lineWidth = 3;
        context.strokeStyle = this.colores.bordeAsteroide;
        context.beginPath();
        context.arc(this.x, this.y, this.radio, 0, Math.PI*2);
        context.stroke();
    }
    colisionMisil(posicionMisil, radioMisil){
        if(((posicionMisil.x - this.x)**2 + (posicionMisil.y - this.y)**2)**(1/2) < radioMisil + this.radio){
            return true;
        }
    }
    colisionNave(nave){
        if(((nave.x - this.x)**2 + (nave.y - this.y)**2)**(1/2) < nave.radio + this.radio){
            return true;
        }
    }
    detectarBordes(){
        if(this.x - this.radio > this.juego.width || this.x + this.radio < 0 || this.y - this.radio > this.juego.height || this.y + this.radio < 0){
            this.activo = false;
        }
    }
    determinarOrigen(){
        let numRandom1 = Math.random();
        let numRandom2 = Math.random();
        let numRandom3 = Math.random();
        this.sectorOrigen(numRandom3);

        //Izquierda del canvas
        if(this.sector == 0){
            this.x = -this.radio*0.8;
            this.y = Math.floor(numRandom1*(this.juego.height + this.radio*1.6)) - this.radio*0.8;
            this.vel.x = 3;
            this.vel.y = Math.floor(numRandom2*6) - 3;//1;
        }
        //Derecha del canvas
        else if(this.sector == 1){
            this.x = this.juego.width + this.radio*0.8;
            this.y = Math.floor(numRandom1*(this.juego.height + this.radio*1.6)) - this.radio*0.8;
            this.vel.x = -3;//-2
            this.vel.y = Math.floor(numRandom2*6); - 3//-1
        }
        //Arriba del canvas
        else if(this.sector == 2){
            this.x = Math.floor(numRandom1*(this.juego.width + this.radio*1.6)) - this.radio*0.8;
            this.y = -this.radio*0.8;
            this.vel.x = Math.floor(numRandom2*6) - 3//1;
            this.vel.y = 3//-2;
        }
        //Abajo del canvas
        else if(this.sector == 3){
            this.x = Math.floor(numRandom1*(this.juego.width + this.radio*1.6)) - this.radio*0.8;
            this.y = this.juego.height + this.radio*0.8;
            this.vel.x = Math.floor(numRandom2*6) - 3//-1;
            this.vel.y = -3//-2;
        }
    }
    mover(){
        this.x += this.vel.x;
        this.y += this.vel.y;
    }
    actualizar(context){
        this.mover();
        this.detectarBordes();
        this.dibujar(context);
    }
}