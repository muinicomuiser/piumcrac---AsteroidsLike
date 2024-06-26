class Juego{
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.offset = {left: canvas.offsetLeft, top: canvas.offsetTop};
        this.activo = false;
        this.gameOver = false;
        this.modoClaro = false;
        this.colores;
        this.textos = [];
        this.nave;
        this.nuevaNave();
        this.misiles = [];
        this.asteroides = [];
        this.crearAsteroide = false;
        this.contadorFrames = 1;
        this.segundos = 0;
        this.fpsNavegador = 60;
        this.puntaje = 0;
        this.nuevosIndicadores();
        this.ajustarColores();
    }
    getActivo(){
        return this.activo;
    }
    getGameOver(){
        return this.gameOver;
    }
    getModoClaro(){
        return this.modoClaro;
    }
    ajustarColores(){
        if(this.modoClaro){
            this.colores = {bordeNave: `hsla(40, 19%, 13%, 1)`, nucleoNave: `hsla(40, 19%, 13%, 1)`, propulsorNave: `hsla(40, 19%, 13%, 1)`, bordeAsteroide: `hsla(40, 19%, 13%, 1)`, misil: `hsla(40, 19%, 13%, 1)`, fondo: `hsla(51, 95%, 93%, 1)`, letras: `hsla(40, 19%, 13%, 1)`, asteroideDestruido: `hsla(40, 19%, 13%, 1)`}
            if(this.textos.length > 0){
                this.textos.forEach((texto) => {texto.setColores(this.colores);
                    texto.setModoClaro(true);
                });
            }
            if(this.asteroides.length > 0){
                this.asteroides.forEach((asteroide) => {asteroide.setColores(this.colores);
                });
            }
            if(this.misiles.length > 0){
                this.misiles.forEach((misil) => {misil.setColor(this.colores);
                });
            }
            this.nave.setColores(this.colores);
        }
        else {
            this.colores = {bordeNave: "white", nucleoNave: `hsla(200, 100%, 60%, 1)`, propulsorNave: `hsla(45, 100%, 60%, 1)`, bordeAsteroide: "white", misil: `hsla(0, 100%, 80%, 1)`, fondo: "black", letras: `hsla(200, 100%, 60%, 1)`, asteroideDestruido: `hsla(45, 100%, 60%, 1)`}
            if(this.textos.length > 0){
                this.textos.forEach((texto) => {texto.setColores(this.colores);
                    texto.setModoClaro(false);
                });
            }
            if(this.asteroides.length > 0){
                this.asteroides.forEach((asteroide) => {asteroide.setColores(this.colores);
                });
            }
            if(this.misiles.length > 0){
                this.misiles.forEach((misil) => {misil.setColor(this.colores);
                });
            }
            this.nave.setColores(this.colores);
        }
    }
    setActivo(activo){
        this.activo = activo;
    }
    setModoClaro(booleanClaro){
        this.modoClaro = booleanClaro;
        this.ajustarColores();
    }
    setTeclaDown(teclaCode){
        if(teclaCode == "ArrowLeft" || teclaCode == "KeyA"){
            this.nave.teclas.left = true;     
        }
        if(teclaCode == "ArrowRight" || teclaCode == "KeyD"){
            this.nave.teclas.right = true;  
        }
        if(teclaCode == "ArrowUp" || teclaCode == "KeyW"){
            this.nave.teclas.up = true;     
        }
        if(teclaCode == "ArrowDown" || teclaCode == "KeyS"){
            this.nave.teclas.down = true;  
        }
    }
    setTeclaUp(teclaCode){
        if(teclaCode == "KeyF" || teclaCode == "KeyK"){
            this.nave.teclas.disparo = true;    
        }
        if(teclaCode == "ArrowLeft" || teclaCode == "KeyA"){
            this.nave.teclas.left = false;     
        }
        if(teclaCode == "ArrowRight" || teclaCode == "KeyD"){
            this.nave.teclas.right = false;  
        }
        if(teclaCode == "ArrowUp" || teclaCode == "KeyW"){
            this.nave.teclas.up = false;     
        }
        if(teclaCode == "ArrowDown" || teclaCode == "KeyS"){
            this.nave.teclas.down = false;  
        }
    }
    setOffset(canvasLeft, canvasTop){
        this.offset.left = canvasLeft;
        this.offset.top = canvasTop;
    }
    componerJuego(context){  
        if(this.modoClaro){
            context.setLineDash([1, 0.2]);
        }
        else {
            context.setLineDash([]);
        }
        this.contarTiempo();        
        this.dibujarFondo(context);  
        this.actualizarMisiles(context);
        this.actualizarNave(context); 
        this.actualizarAsteroides(context);        
        this.crearEnemigos();
        this.actualizarTextos(context);        
        //this.mostrarVelocidad(context);
    }
    pausa(context){
        if(this.modoClaro){
            context.setLineDash([1, 0.2]);
        }
        else {
            context.setLineDash([]);
        }
        this.dibujarFondo(context);
        this.nave.dibujarPausa(context);
        this.dibujarAsteroides(context);
        this.dibujarMisiles(context);
        this.actualizarTextos(context);        
    }
    dibujarGameOver(context){
        if(this.modoClaro){
            context.setLineDash([1, 0.2]);
        }
        else {
            context.setLineDash([]);
        }
        this.dibujarFondo(context);
        this.nave.dibujarPausa(context);
        this.actualizarTextos(context);
    }
    terminarJuego(){
        this.nuevoTexto("gameover", this); 
        this.activo = false;  
        this.gameOver = true;        
    }  
    nuevosIndicadores(){
        let textoPausa = new Texto("pausa", this);
        this.textos.push(textoPausa);
        let textoPuntaje = new Texto("puntaje", this);
        this.textos.push(textoPuntaje);
        let vidas = new Texto("vidas", this);
        this.textos.push(vidas);
    }
    nuevaNave(){
        this.nave = new Nave(this);
    }
    nuevoMisil(){
        let misil = new Misil(this);
        misil.setAngulo(this.nave.ang);
        this.nuevoTexto("disparo", this.nave);
        this.misiles.push(misil);
    }
    nuevoAsteroide(){
        let asteroide = new Asteroide(this);
        asteroide.determinarOrigen();
        this.asteroides.push(asteroide);
    }  
    nuevoTexto(tipo, objeto){
        let texto = new Texto(tipo, objeto);
        this.textos.push(texto);
    }  
    crearEnemigos(){
        if(this.crearAsteroide && this.nave.viva){
            this.nuevoAsteroide();
            if(this.puntaje > 10000){
                this.nuevoAsteroide();
            }
            this.crearAsteroide = false;
        }
    }
    actualizarNave(context){
        this.nave.actualizar(context);
        if(this.nave.viva == false){
            this.nave.contadorFrames++;
            if(this.nave.vidas > 0 && this.nave.contadorFrames == 60){
                this.nave.reset();
                this.nave.viva = true;
            }
            else if(this.nave.vidas == 0){
                this.terminarJuego();
            }
        }
    }
    actualizarMisiles(context){
        if(this.gameOver == false && this.nave.viva == true){
            if(this.nave.teclas.disparo){
                this.nuevoMisil(this);
                this.nave.teclas.disparo = false;
            }
        }
        if(this.misiles.length > 0){
            for(let misil of this.misiles){
                misil.actualizar(context);
            }
            let id = this.misiles.findIndex(misil => misil.getEstado() == false);
            if(id >= 0){
                this.misiles.splice(id, 1);
            }
        }
    }  
    actualizarAsteroides(context){
        //Asteroides y misiles
        let idAsteroideDestruido = -1;
        if(this.asteroides.length > 0){            
                for(let idAst in this.asteroides){   
                    if(this.misiles.length > 0){             
                    for(let misil of this.misiles){
                        if(this.asteroides[idAst].colisionMisil(misil.getPosicion(), misil.getRadio())){
                            misil.setEstado(false);
                            this.asteroides[idAst].activo = false;
                            idAsteroideDestruido = idAst;
                            this.nuevoTexto("asteroideDestruido", this.asteroides[idAst]);
                            this.puntaje+= this.asteroides[idAst].puntos;
                        }
                    }
                }    
                if(this.asteroides[idAst].activo){
                    this.asteroides[idAst].actualizar(context);
                }            
            }
            if(idAsteroideDestruido >= 0){
                this.asteroides.splice(idAsteroideDestruido, 1);
            }
        }

        //Asteroides y nave
        for(let idAst in this.asteroides){
            if(this.asteroides[idAst].colisionNave(this.nave)){
                this.nave.viva = false; 
                this.nuevoTexto("naveDestruida", this.nave);
                break;
            }
        }
        if(this.nave.viva == false){
            this.asteroides = [];
        }
    }
    actualizarTextos(context){
        if(this.gameOver == false){
            if(this.textos.length > 0){
                let id = this.textos.findIndex(texto => texto.activo === false);
                if(id >= 0){
                    this.textos.splice(id, 1);
                }
            }
        }
        this.dibujarTextos(context);
    }
    dibujarTextos(context){
        if(this.textos.length > 0){
            for(let texto of this.textos){
                texto.dibujar(context);
            }        
        }
    }
    dibujarAsteroides(context){
        for(let asteroide of this.asteroides){
            asteroide.dibujar(context);
        }
    }  
    dibujarMisiles(context){
        for(let misil of this.misiles){
            misil.dibujar(context);
        }
    }
    dibujarFondo(context){
        context.clearRect(0, 0, this.width, this.height);
        this.dibujarEstrellas(context);
    }
    dibujarEstrellas(context){
        context.beginPath();
        context.strokeStyle = "white";
        context.lineWidth = 1;
        let estrella = {x: Math.floor(this.width*Math.random()), y: Math.floor(this.height*Math.random())};
        context.moveTo(estrella.x, estrella.y);
        context.lineTo(estrella.x + 2, estrella.y);
        context.stroke();
        context.beginPath();
        context.moveTo(estrella.x + 1, estrella.y - 1);
        context.lineTo(estrella.x + 1, estrella.y + 1);
        context.stroke();
    }
    contarTiempo(){
        this.contadorFrames++;
        if(this.contadorFrames == 61){
            this.contadorFrames = 1;
            this.segundos++;
            this.crearAsteroide = true;
        }
    }
    mostrarVelocidad(context){
        context.textAlign = "left";
        context.fillStyle = "white";
        context.fillText(this.nave.vel.v, 50, 60);
    }
}