import Ship from './class/Ship.js'
import Bullet from './class/Bullet.js'

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

    ship = new Ship(canvasHeight, canvasWidth);

    /*** Adicionando em um array, consigo trabalhar com vários botões ao mesmo tempo */
    document.body.addEventListener("keydown", function(e) {
        keys[e.key] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.key] = false;
        
        if(e.key == 'c') {
        bullets.push(new Bullet(ship.angle, ship.noseX, ship.noseY));
        }

    });

    render();
}

function render() {
    ship.thrusting = (keys["w"]);
    if(keys['d']) {
        ship.Rotate(1);
    }
    if(keys['a']) {
        ship.Rotate(-1);
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ship.Update(canvasHeight, canvasWidth);
    ship.Draw(ctx);

    if(bullets.length !== 0) {
        for(let i=0; i<bullets.length; i++) {
            bullets[i].Update();
            bullets[i].Draw(ctx);
        }
    }

    requestAnimationFrame(render);
}


