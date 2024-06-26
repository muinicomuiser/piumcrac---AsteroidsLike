class Texto{
    constructor(tipoTexto, objeto){
        this.objeto = objeto;
        this.tipo = tipoTexto;
        this.colores = this.objeto.colores;
        this.modoClaro = false;
        this.x;
        this.y;
        this.dimension;
        this.ang;
        this.texto;
        this.fuente;
        this.determinarEvento(tipoTexto);
        this.contadorFrames = 1;
        this.random = Math.random();
        this.activo = true;
    }
    setModoClaro(booleanClaro){
        this.modoClaro = booleanClaro;
    }
    setColores(colores){
        this.colores = colores;
    }
    dibujar(context){
        if(this.modoClaro){
            context.globalAlpha = 0.8;
        } else {
            context.globalAlpha = 1;
        }
        switch(this.tipo){
            case "disparo":
                this.dibujarTextoDisparo(context);
                break;
                
            case "asteroideDestruido":
                this.dibujarTextoAsteroideDestruido(context);
                break;
                
            case "naveDestruida":
                this.dibujarTextoNaveDestruida(context);
                break;
                
            case "pausa":
                this.dibujarTextoPausa(context);
                break;

            case "puntaje":
                this.dibujarTextoPuntaje(context);
                break;  

            case "vidas":
                this.dibujarVidas(context);
                break;  
                                
            case "gameover":
                this.dibujarTextoGameover(context);
                break;
            }
        context.globalAlpha = 1;
    }
    determinarEvento(tipoTexto){
        switch(tipoTexto){
            case "disparo":
                this.determinarTextoDisparo();
                break;
            
            case "asteroideDestruido":
                this.determinarTextoAsteroideDestruido();
                break;  

            case "naveDestruida":
                this.determinarTextoNaveDestruida();
                break;                 

            case "pausa":
                this.texto = "PAUSA";
                break;

            case "puntaje":
                this.texto = "PUNTAJE ";
                break;  

            case "vidas":
                break;  
                
            case "gameover":
                this.determinarTextoGameover();
                break;
        }
    }
    casoRandom(numCasos){
        return Math.floor((numCasos * Math.random())) + 1;
    }
    determinarTextoDisparo(){
        this.x = this.objeto.x;
        this.y = this.objeto.y;        
        let caso = this.casoRandom(5);
        switch(caso){
            case 1:
                this.texto = "pium!";
                break;
            case 2:
                this.texto = "bang!";
                break;
            case 3:
                this.texto = "plip!";
                break;
            case 4:
                this.texto = "frap!";
                break;
            case 5:
                this.texto = "pam!";
                break;
        }  
    }
    dibujarTextoDisparo(context){
        this.fuente = "800 20px monospace";
        this.color = this.colores.misil;
        if(this.contadorFrames > 20){
            this.activo = false;
            this.color = this.colores.fondo;
        }
        context.fillStyle = this.color;
        context.font = this.fuente;
        context.textAlign = "center";
        context.fillText(this.texto, this.x + Math.floor(40*this.random), this.y - 20 - this.contadorFrames);
        this.contadorFrames++;
    }
    determinarTextoAsteroideDestruido(){    
        this.x = this.objeto.x;
        this.y = this.objeto.y;        
        let caso = this.casoRandom(4);
        switch(caso){
            case 1:
                this.texto = "pop";
                break;
            case 2:
                this.texto = "crac";
                break;
            case 3:
                this.texto = "pup";
                break;
            case 4:
                this.texto = "ploc";
                break;
        }
    }
    dibujarTextoAsteroideDestruido(context){
        this.color = this.colores.asteroideDestruido;        
        this.fuente = `200 22px monospace`;
        if(this.contadorFrames > 30){
            this.activo = false;
        }
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.lineWidth = 8;
        context.font = this.fuente;
        context.textAlign = "center";
        context.fillText(this.texto, this.x, this.y);
        this.contadorFrames++;
        context.beginPath();
        context.arc(this.x, this.y - 5, 36, this.random*2*Math.PI, this.random*2*Math.PI + 2*Math.PI);
        context.setLineDash([3, 30]);
        context.stroke();
        context.setLineDash([]);
    }
    determinarTextoGameover(){
        let caso = this.casoRandom(8);
        switch(caso){
            case 1:
                this.texto = "PERDISTE";
                break;
            case 2:
                this.texto = "TE DESTRUYERON :'(";
                break;
            case 3:
                this.texto = "VUELVE A INTENTARLO!!";
                break;
            case 4:
                this.texto = "CAÍSTE ANTE LOS CIRCULITOS PERVERSOS";
                break;
            case 5:
                this.texto = "¿CUÁNTOS PUNTOS GANASTE?";
                break;
            case 6:
                this.texto = "YA NO QUEDA NADA DE TI";
                break;
            case 7:
                this.texto = "NOOOOOOOOOOOOOOO!";
                break;
            case 8:
                this.texto = "YA NO QUEDAN NAVES";
                break;
        }  
    }
    dibujarTextoGameover(context){
        context.textAlign = "center";
        context.fillStyle = this.colores.bordeNave;
        context.font = "400 40px monospace"
        context.fillText(this.texto, this.objeto.width / 2, this.objeto.height / 2);
        context.fillStyle = this.colores.nucleoNave;
        context.font = "100 30px monospace"
        context.fillText("PUNTAJE " + this.objeto.puntaje, this.objeto.width / 2, this.objeto.height / 2 + 40);
    }
    determinarTextoNaveDestruida(){
        this.x = this.objeto.x;
        this.y = this.objeto.y;
        let caso = this.casoRandom(8);
        switch(caso){
            case 1:
                this.texto = "f";
                break;
            case 2:
                this.texto = ":c";
                break;
            case 3:
                this.texto = "X(";
                break;
            case 4:
                this.texto = "puf";
                break;
            case 5:
                this.texto = ":O";
                break;
            case 6:
                this.texto = "Dx";
                break;
            case 7:
                this.texto = ":'(";
                break;
            case 8:
                this.texto = "u.u";
                break;
        }    
    }
    dibujarTextoNaveDestruida(context){        
        this.color = this.colores.bordeNave;        
        this.fuente = `200 20px monospace`;
        if(this.contadorFrames > 60){
            this.activo = false;
        }
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.lineWidth = 6;
        context.font = this.fuente;
        context.textAlign = "center";
        context.fillText(this.texto, this.x, this.y);
        this.contadorFrames++;
        context.beginPath();
        context.arc(this.x, this.y - 5, 30, this.random*2*Math.PI, this.random*2*Math.PI + 2*Math.PI);
        context.setLineDash([3, 30]);
        context.stroke();
        context.setLineDash([]);
    }
    dibujarTextoPuntaje(context){
        if(this.objeto.gameOver == false){
            context.textAlign = "left";
            context.fillStyle = this.colores.nucleoNave;
            context.font = "600 24px monospace"
            context.fillText(this.texto + this.objeto.puntaje, 30, 40)
        }
    }
    dibujarTextoPausa(context){
        if(this.objeto.activo == false && this.objeto.gameOver == false){
            context.textAlign = "left";
            context.fillStyle = this.colores.nucleoNave;
            context.font = "600 24px monospace"
            context.fillText(this.texto, this.objeto.width - 100, 40);
        }
    }
    dibujarVidas(context){
        if(this.objeto.gameOver == false){
            context.fillStyle = this.colores.nucleoNave;
            context.strokeStyle = this.colores.nucleoNave;
            context.lineWidth = 2;
            for(let i = 1; i <= 3; i++){
                context.beginPath();
                context.arc(36 * i + 4, 60, 8, 0, Math.PI * 2);
                if(i <= this.objeto.nave.vidas){
                    context.fill();
                }
                context.stroke();
            }
        }
    }
}