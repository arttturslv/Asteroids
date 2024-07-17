let canvas;
let ctx;
let ship;
let canvasWidth = 1400;
let canvasHeight = 1000;
let keys = [];
let bullets = [];
let asteroids = [];

document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas () {
    canvas = document.getElementById("my-canvas");
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    /*** Adicionando em um array, consigo trabalhar com vários botões ao mesmo tempo */
    document.body.addEventListener("keydown", function(e) {
        keys[e.key] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.key] = false;

   
    });

 
}



