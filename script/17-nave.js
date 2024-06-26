class Nave{
    constructor(juego){
        this.juego = juego;
        this.canvas = this.juego.canvas;
        this.colores = this.juego.colores;
        this.modeloNave = 1;
        this.origen = {x: juego.width/2, y: juego.height/2,}
        this.x = this.origen.x
        this.y = this.origen.y;
        this.teclas = {up: false, down: false, left: false, right: false, disparo: false};
        this.vel = {v: 0, x:0 , y:0};
        this.ang = Math.PI/2;
        this.radio = 7; 
        this.vidas = 3;
        this.viva = true;
        this.contadorFrames = 1;
    }
    getPosicion(){
        return {x: this.x, y: this.y};
    }
    getRadio(){
        return this.radio;
    }
    getModeloNave(){
        return this.modeloNave;
    }
    getRadio(){
        return this.radio;
    }
    getAngulo(){
        return this.ang;
    }
    setModeloNave(numModelo){
        this.modeloNave = numModelo;
    }
    setColores(colores){
        this.colores = colores;
    }
    dibujarPausa(context){
        if(this.viva){
            context.save();        
            this.rotar(context);
            switch(this.modeloNave){
                case 1: 
                    this.dibujarNave1(context);
                    this.radio = 7;
                    break;
                case 2: 
                    this.dibujarNave2(context);
                    this.radio = 6;
                    break;
                case 3: 
                    this.dibujarNave3(context);
                    this.radio = 6;
                    break;
            }
            context.restore();
        }
    }
    actualizar(context){
        if(this.viva){
            context.save();        
            this.rotar(context);
            switch(this.modeloNave){
                case 1: 
                    this.dibujarNave1(context);
                    this.radio = 7;
                    break;
                case 2: 
                    this.dibujarNave2(context);
                    this.radio = 6;
                    break;
                case 3: 
                    this.dibujarNave3(context);
                    this.radio = 6;
                    break;
            }
            context.restore();
            this.mover();
            this.detectarBordes();
        }
    }
    rotar(context){
        if(this.teclas.right){
            this.ang -= Math.PI/40;
        }
        if(this.teclas.left){
            this.ang += Math.PI/40;
        }
        context.translate(this.x, this.y);
        context.rotate(-this.ang);
        context.translate(-this.x, -this.y);
    }
    mover(){
        if(this.teclas.up){
            this.vel.v += 0.013;
        }
        if(this.teclas.down){
            this.vel.v += -0.007;
        }
        this.vel.x += this.vel.v * Math.cos(this.ang);
        this.vel.y += this.vel.v * (-1) * Math.sin(this.ang);
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.vel.x *= 0.99;
        this.vel.y *= 0.99;
        this.vel.v *= 0.92;
        if(this.vel.v < 0.001 && this.vel.v > -0.001){
            this.vel.v = 0;
        }
    }
    detectarBordes(){
        if(this.x - this.radio < 0){
            this.vel.x = 0;
            this.x = this.radio;
        }
        if(this.x + this.radio > this.juego.width){
            this.vel.x = 0;
            this.x = this.juego.width - this.radio;
        }
        if(this.y - this.radio < 0){
            this.vel.y = 0;
            this.y = this.radio;
        }
        if(this.y + this.radio > this.juego.height){
            this.vel.y = 0;
            this.y = this.juego.height - this.radio;
        }
    }
    intensidadPropulsor(){
        return this.vel.v*6; 
    }
    reset(){
        this.x = this.origen.x;
        this.y = this.origen.y;
        this.vel.x = 0;
        this.vel.y = 0;
        this.vel.v = 0;
        this.ang = Math.PI/2;
        this.vidas--;
        this.contadorFrames = 1;
    }
    dibujarNave1(context){
        //Núcleo
        context.fillStyle = this.colores.nucleoNave;
        context.beginPath();
        context.arc(this.x + 0.8*this.radio, this.y, this.radio/2, -Math.PI*0.5, Math.PI*2);
        context.fill(); 

        //Bordes
        context.lineWidth = 2;
        context.strokeStyle = this.colores.bordeNave;
        
        context.beginPath();
        context.arc(this.x, this.y, this.radio, 0, 2*Math.PI);
        context.stroke();
                
        context.beginPath();
        context.arc(this.x - this.radio*2, this.y, 1.3*this.radio, -Math.PI*0.5, -Math.PI*1.5);
        context.stroke();
        
        //Propulsores
        context.fillStyle = this.colores.propulsorNave;
        context.globalAlpha = this.intensidadPropulsor();
        context.beginPath();
        context.arc(this.x - 2*this.radio, this.y + 1.3*this.radio, this.radio*0.5, -Math.PI*0.5, 2*Math.PI);
        context.fill();   
        context.beginPath();
        context.arc(this.x - 2*this.radio, this.y - 1.3*this.radio, this.radio*0.5, -Math.PI*0.5, 2*Math.PI);
        context.fill(); 
        context.globalAlpha = 1;
    }
    dibujarNave2(context){
        
        //Borde central
        context.strokeStyle = this.colores.bordeNave;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - this.radio*3, this.y);
        context.stroke();

        //Núcleo
        context.fillStyle = this.colores.nucleoNave;
        context.beginPath();
        context.arc(this.x, this.y, this.radio*0.618, 0, 2*Math.PI);
        context.fill();
        
        //Núcleo 2
        context.beginPath();
        context.arc(this.x - this.radio*3, this.y, this.radio*0.5, 0, 2*Math.PI);
        context.fill();
        
        //Bordes
        context.beginPath();
        context.arc(this.x, this.y, this.radio, -0.435*Math.PI, -1.55*Math.PI);
        context.stroke();

        context.beginPath();
        context.moveTo(this.x - this.radio*1.618, this.y - this.radio*1.618);
        context.lineTo(this.x + this.radio*0.2, this.y - this.radio);
        context.stroke();
        
        context.beginPath();
        context.moveTo(this.x + this.radio*0.2, this.y + this.radio);
        context.lineTo(this.x - this.radio*1.618, this.y + this.radio*1.618);
        context.stroke();
        
        
        
        //Propulsores
        context.fillStyle = this.colores.propulsorNave;
        context.globalAlpha = this.intensidadPropulsor();
        context.beginPath();
        context.arc(this.x - this.radio*1.618, this.y - this.radio*1.618, this.radio*0.5, 0, 2*Math.PI);
        context.fill();
        context.beginPath();
        context.arc(this.x - this.radio*1.618, this.y + this.radio*1.618, this.radio*0.5, 0, 2*Math.PI);
        context.fill();
        context.globalAlpha = 1;
    }
    dibujarNave3(context){
        context.fillStyle = this.colores.nucleoNave;
        
        //Núcleo
        context.beginPath();
        context.arc(this.x, this.y, this.radio*0.818, Math.PI*0.5, 1.5*Math.PI);
        context.fill();
        
        //Bordes
        context.strokeStyle = this.colores.bordeNave;
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(this.x - this.radio*2, this.y - this.radio*1.618);
        context.lineTo(this.x + this.radio*2.5, this.y);
        context.stroke();
        
        context.beginPath();
        context.moveTo(this.x - this.radio*2, this.y + this.radio*1.618);
        context.lineTo(this.x + this.radio*2.5, this.y);
        context.stroke();        

       
        context.beginPath();
        context.arc(this.x - this.radio*2, this.y, this.radio*2, -Math.PI*0.15, -Math.PI*1.85);
        context.stroke();

        //Propulsores
        context.fillStyle = this.colores.propulsorNave;
        context.globalAlpha = this.intensidadPropulsor();
        context.beginPath();
        context.arc(this.x - this.radio*2.3, this.y - this.radio*1.718, this.radio*0.55, 0, 2*Math.PI);
        context.fill();
        context.beginPath();
        context.arc(this.x - this.radio*2.3, this.y + this.radio*1.718, this.radio*0.55, 0, 2*Math.PI);
        context.fill();
        context.globalAlpha = 1;
    }
}
//context.translate(x, y) <-- mueve el punto eje de rotación
//context.rotate(angle) <-- rota en sentido horario en torno al punto de rotación