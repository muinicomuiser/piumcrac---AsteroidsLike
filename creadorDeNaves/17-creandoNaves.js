let CANVASNAVES = document.getElementById("canvas");
let CONTEXTNAVES = CANVASNAVES.getContext("2d");

CANVASNAVES.width = 300;
CANVASNAVES.height = 300;
CANVASNAVES.style = "background-color: black";

window.addEventListener('load', ()=>{
   let nuevaNave = new Navecita(CANVASNAVES);
    nuevaNave.dibujarNave3(CONTEXTNAVES);
});

class Navecita{
    constructor(canvas){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radio = 12; 
    }
    dibujarNave1(context){
        context.strokeStyle = `hsla(350, 100%, 100%, 1)`;
        context.beginPath();
        context.arc(this.x, this.y, this.radio, 0, 2*Math.PI);
        context.stroke();
        
        context.fillStyle = `hsla(45, 86%, 61%, 1)`;
        context.beginPath();
        context.arc(this.x + 0.8*this.radio, this.y, this.radio/2, -Math.PI*0.5, Math.PI*2);
        context.fill(); 
        
        context.beginPath();
        context.arc(this.x - this.radio*2, this.y, 1.3*this.radio, -Math.PI*0.5, -Math.PI*1.5);
        context.stroke();
        
        
        context.fillStyle = `hsla(195, 52%, 52%, 1)`;
        context.beginPath();
        context.arc(this.x - 2*this.radio, this.y + 1.3*this.radio, this.radio/3, -Math.PI*0.5, 2*Math.PI);
        context.fill();   
        context.beginPath();
        context.arc(this.x - 2*this.radio, this.y - 1.3*this.radio, this.radio/3, -Math.PI*0.5, 2*Math.PI);
        context.fill(); 
    }
    dibujarNave2(context){
        context.strokeStyle = `hsla(350, 100%, 100%, 1)`;
        context.fillStyle = `hsla(195, 52%, 52%, 1)`;

        
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
        
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - this.radio*3, this.y);
        context.stroke();
        context.beginPath();
        context.arc(this.x, this.y, this.radio*0.618, 0, 2*Math.PI);
        context.fill();
        
        context.arc(this.x - this.radio*3, this.y, this.radio*0.3, 0, 2*Math.PI);
        context.fill();
        context.fillStyle = `hsla(45, 86%, 61%, 1)`;
        context.beginPath();
        context.arc(this.x - this.radio*1.618, this.y - this.radio*1.618, this.radio*0.3, 0, 2*Math.PI);
        context.fill();
        context.beginPath();
        context.arc(this.x - this.radio*1.618, this.y + this.radio*1.618, this.radio*0.3, 0, 2*Math.PI);
        context.fill();
    }
    dibujarNave3(context){
        context.strokeStyle = `hsla(350, 100%, 100%, 1)`;
        context.fillStyle = `hsla(195, 52%, 52%, 1)`;

        
        // context.beginPath();
        // context.arc(this.x, this.y, this.radio, -0.435*Math.PI, -1.55*Math.PI);
        // context.stroke();
        
        context.beginPath();
        context.moveTo(this.x - this.radio*2, this.y - this.radio*1.618);
        context.lineTo(this.x + this.radio*2.5, this.y);
        context.stroke();
        
        context.beginPath();
        context.moveTo(this.x - this.radio*2, this.y + this.radio*1.618);
        context.lineTo(this.x + this.radio*2.5, this.y);
        context.stroke();        

        context.beginPath();
        context.arc(this.x, this.y, this.radio*0.618, Math.PI*0.5, 1.5*Math.PI);
        context.fill();

        
        context.beginPath();
        context.arc(this.x - this.radio*2, this.y, this.radio*2, -Math.PI*0.15, -Math.PI*1.85);
        context.stroke();
        context.fillStyle = `hsla(45, 86%, 61%, 1)`;

        context.beginPath();
        context.arc(this.x - this.radio*2.3, this.y - this.radio*1.718, this.radio*0.3, 0, 2*Math.PI);
        context.fill();
        context.beginPath();
        context.arc(this.x - this.radio*2.3, this.y + this.radio*1.718, this.radio*0.3, 0, 2*Math.PI);
        context.fill();
    }

}