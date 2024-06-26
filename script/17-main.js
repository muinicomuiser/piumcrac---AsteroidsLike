/**Proyecto 17
 * Control de nave, misiles y blancos  
 */


//CONSTANTES
let CANVAS = document.getElementById("canvas");
let CONTEXT = CANVAS.getContext("2d");
CANVAS.width = 840;
CANVAS.height = 560;

let nuevoJuego;
let btnPausar = document.getElementById("btnPausar");
let btnNave = document.getElementById("btnNave");
let btnModoClaro = document.getElementById("btnModoClaro")

//MAIN
window.addEventListener('load', ()=>{
    nuevoJuego = new Juego(CANVAS);
    nuevoJuego.componerJuego(CONTEXT);
    animar();

});

//Animación y dibujo del juego. Define el dibujo según el estado del juego: activo, pausa y gameover
function animar(){
    if(nuevoJuego.getActivo() == true && nuevoJuego.getGameOver() == false){
        nuevoJuego.componerJuego(CONTEXT);
    }
    else if(nuevoJuego.getActivo() == false && nuevoJuego.getGameOver() == false){
        nuevoJuego.pausa(CONTEXT);
    }
    else{
        nuevoJuego.dibujarGameOver(CONTEXT);
        btnPausar.value = "Reiniciar";
    }
    requestAnimationFrame(animar);   
}

//Botón de inicio, pausa, continuar y reinicio
btnPausar.addEventListener("mousedown", ()=>{
    if(nuevoJuego.getGameOver() == false){
        nuevoJuego.setActivo(!nuevoJuego.getActivo());
        if(nuevoJuego.getActivo() == true){
            btnPausar.value = "Pausar";
        }
        else {
            btnPausar.value = "Continuar";
        }    
    }
    else {
        btnPausar.value = "Pausar";
        let modoClaro = nuevoJuego.getModoClaro();
        nuevoJuego = new Juego(CANVAS);
        nuevoJuego.setModoClaro(modoClaro);
        nuevoJuego.setActivo(!nuevoJuego.getActivo());
    }
})


//Controles - Teclas presionadas
document.addEventListener("keydown", (event)=>{
    if(nuevoJuego.getActivo()){
        nuevoJuego.setTeclaDown(event.code);
    }
    if(event.code == "ArrowDown" || event.code == "ArrowUp" || event.code == "Space" ){
        event.preventDefault();
    }
})

//Controles - Teclas liberadas
document.addEventListener("keyup", (event)=>{
        if(nuevoJuego.getActivo()){
            nuevoJuego.setTeclaUp(event.code);
        }
})

//Botón de cambio de tipo de nave
btnNave.addEventListener("mousedown", ()=>{
    let numModelo = nuevoJuego.nave.getModeloNave() + 1;
    if(numModelo > 3){
        nuevoJuego.nave.setModeloNave(1);
    }
    else{
        nuevoJuego.nave.setModeloNave(numModelo);
    }
})

//Botón de cambio de estado (claro - oscuro)
let MAIN = document.getElementById("main");
let BODY = document.getElementById("body");
let HEADER1 = document.getElementById("header1");
let HEADER2 = document.getElementById("header2");
let COMANDO = document.getElementsByClassName("comando")
let BOTONES = document.getElementsByClassName("botones")

btnModoClaro.addEventListener("mousedown", ()=>{
    nuevoJuego.setModoClaro(!nuevoJuego.getModoClaro());
    if(nuevoJuego.getModoClaro() == true){
        btnModoClaro.value = "Modo Oscuro";
        cambiarColores(true);
    }
    else {
        btnModoClaro.value = "Modo Claro";
        cambiarColores(false);
    }        
})

function cambiarColores(booleanClaro){
    if(booleanClaro){
        BODY.style = "background-color: hsl(51, 95%, 93%); border-color: hsl(40, 19%, 13%); color: hsl(40, 19%, 13%)";
        HEADER2.style = "color: hsl(40, 19%, 13%)";
        HEADER1.style = "color: hsl(40, 19%, 13%)";
        MAIN.style = "color: hsl(40, 19%, 13%)";
        CANVAS.style = "border-color: hsl(40, 19%, 13%)";
        for(let elemento of COMANDO){
            elemento.style.borderColor = "hsl(40, 19%, 13%)"
        }
        for(let elemento of BOTONES){
            elemento.style.borderColor = "hsl(40, 19%, 13%)"
        }
    }
    else{
        BODY.style = "background-color: black; border-color: hsl(40, 19%, 13%); color: hsl(38, 56%, 81%)";
        HEADER2.style = "color: hsl(38, 56%, 81%)";
        HEADER1.style = "color: hsl(195, 52%, 62%)";
        MAIN.style = "color: hsl(38, 56%, 81%)";
        CANVAS.style = "border-color: hsl(38, 56%, 81%)";
        for(let elemento of COMANDO){
            elemento.style.borderColor = "hsl(38, 56%, 81%)"
        }
        for(let elemento of BOTONES){
            elemento.style.borderColor = "hsl(195, 52%, 62%)"
        }
    }
}

//Actualización del Offset
window.addEventListener("resize", () =>{
    nuevoJuego.setOffset(CANVAS.offsetLeft, CANVAS.offsetTop);
})