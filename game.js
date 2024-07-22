import Ship from './class/Ship.js'
import Bullet from './class/Bullet.js'
import Asteroid from './class/Asteroid.js'


let canvas;
let ctx;
let ship;
let lives = 5;
let score = 1;
let canvasWidth = window.innerWidth - 5;
let canvasHeight = window.innerHeight - 5;
let keys = [];
let bullets = [];
let asteroids = [];
let isGameStarted = false;
let index = 0;

let isMainMenuShowing = true;
let isSecondaryMenuShowing = false;

document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas() {
    canvas = document.getElementById("my-canvas");
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ship = new Ship(canvasHeight, canvasWidth);

    generateAsteroids(8);

    /*** Adicionando em um array, consigo trabalhar com vários botões ao mesmo tempo */
    document.body.addEventListener("keydown", function (e) {
        if (isGameStarted) {
            keys[e.key] = true;
        } else { //se o jogo não iniciou
            console.log("ta pegando")
            navigateThroughMenu(e.key)
        }
    });
    document.body.addEventListener("keyup", function (e) {
        keys[e.key] = false;

        if (e.key == ' ') {
            bullets.push(new Bullet(ship.angle, ship.noseX, ship.noseY));
        }
    });

    const divs = document.querySelectorAll('.joy');

    divs.forEach(el => el.addEventListener('touchstart', event => {
        console.log(event.target.innerText);
        var  key = (event.target.innerText).toLowerCase();
        
        if(key=='🎯')
            key=' ';

        if (isGameStarted) {
            keys[key] = true;
        } else { //se o jogo não iniciou
            console.log("ta pegando")
            navigateThroughMenu(key)
        }

    }));
    divs.forEach(el => el.addEventListener('touchend', event => {
        var key = (event.target.innerText).toLowerCase();
        
        if(key=='🎯')
            key=' ';

        keys[key] = false;

        if (key == ' ') {
            bullets.push(new Bullet(ship.angle, ship.noseX, ship.noseY));
        }

    }));


    render();
}

function render() {
    ship.thrusting = (keys["w"]);
    if (keys['d']) {
        ship.Rotate(1);
    }
    if (keys['a']) {
        ship.Rotate(-1);
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    ctx.fillText("SCORE: " + score.toString(), 20, 35);

    if (lives <= 0) {
        setEndGame();
    }
    DrawLifeShips(ctx);

    if (asteroids.length !== 0) {
        for (let k = 0; k < asteroids.length; k++) {
            if (CircleCollisions(ship.x, ship.y, 11, asteroids[k].x, asteroids[k].y, asteroids[k].collisionRadius)) {
                ship.x = canvasWidth / 2;
                ship.y = canvasHeight / 2;
                ship.velX = 0;
                ship.velY = 0;
                lives -= 1;
            }

        }
    }

    if (asteroids.length !== 0 && bullets.length != 0) {
        loop1:
        for (let l = 0; l < asteroids.length; l++) {
            for (let m = 0; m < bullets.length; m++) {
                if (CircleCollisions(bullets[m].x, bullets[m].y, 3, asteroids[l].x, asteroids[l].y, asteroids[l].collisionRadius)) {
                    if (asteroids[l].level === 1) {
                        asteroids.push(new Asteroid(canvasHeight, canvasWidth, asteroids[l].x - 5, asteroids[l].y - 5, 25, 2, 22));
                        asteroids.push(new Asteroid(canvasHeight, canvasWidth, asteroids[l].x + 5, asteroids[l].y + 5, 25, 2, 22))
                    } else if (asteroids[l].level === 2) {
                        asteroids.push(new Asteroid(canvasHeight, canvasWidth, asteroids[l].x - 5, asteroids[l].y - 5, 15, 3, 12));
                        asteroids.push(new Asteroid(canvasHeight, canvasWidth, asteroids[l].x + 5, asteroids[l].y + 5, 15, 3, 12))
                    }
                    asteroids.splice(l, 1);
                    bullets.splice(m, 1);
                    score += 20;
                    break loop1;
                }
            }
        }
    }



    if (ship.visible) {
        ship.Update(canvasHeight, canvasWidth);
        ship.Draw(ctx);
    }

    if (bullets.length !== 0) {
        for (let i = 0; i < bullets.length; i++) {
            if(
                bullets[i].x > (1.5*canvasWidth) || bullets[i].x < -(canvasWidth*0.5) ||
                bullets[i].y > (1.5*canvasHeight) || bullets[i].y < -(canvasHeight*0.5)

            ) {
                console.log('bala saiu da tela');
                bullets.splice(i, 1);
            } else {
                console.log('atualizando')
                bullets[i].Update();
                bullets[i].Draw(ctx);
            }
        };
    }

    if (asteroids.length !== 0) {
        for (let j = 0; j < asteroids.length; j++) {
            asteroids[j].Update(canvasHeight, canvasWidth);
            asteroids[j].Draw(ctx, j);
        }
    }

    requestAnimationFrame(render);
}


function generateAsteroids(qnt) {
    for (let i = 0; i < qnt; i++) {
        asteroids.push(new Asteroid(canvasHeight, canvasWidth));
    }
}

function setEndGame() {
    document.getElementById("menu").style.display = 'block';
    isGameStarted=false;
    isMainMenuShowing=true;

    ship.visible = false;
    asteroids = [];
    bullets = [];
    lives=0;
}

function setPlayGame() {
    document.getElementById("menu").style.display = 'none';
    isGameStarted=true;
    isMainMenuShowing=false;

    ship.visible = true;
    asteroids = [];
    generateAsteroids(8);
    bullets = [];
    lives=5;
    score=0;
}

function navigateThroughMenu(key) {
    const listaOpcoes = document.getElementById("list");
    const opcaoDois = document.getElementById("records");
    const opcaoTres = document.getElementById("instrucoes");
    const opcaoQuatro = document.getElementById("extra");

    if(isSecondaryMenuShowing) { //menu secundario ta sendo mostrado, então qualquer tecla, me leva pro primeiro menu

        listaOpcoes.style.display="block";
        opcaoDois.style.display="none";
        opcaoTres.style.display="none";
        opcaoQuatro.style.display="none";
        isSecondaryMenuShowing=false;

    } else {
            /** User clicks up */
            if (key == 'w' || key == "ArrowUp") {
                listaOpcoes.getElementsByTagName("li")[index].classList.remove("selected");
                index = (index + 3) % 4;
                listaOpcoes.getElementsByTagName("li")[index].classList.add("selected");
            }
            /** User clicks down */
            if (key == 's' || key == "ArrowDown") {
                listaOpcoes.getElementsByTagName("li")[index].classList.remove("selected");
                index = ((index + 1) % 4);
                listaOpcoes.getElementsByTagName("li")[index].classList.add("selected");
            }
            /**User clicks something */
            if (key == 'Enter' || key =="Backspace" || key == " ") {
                handleChoiceUser(index, listaOpcoes, opcaoDois, opcaoTres, opcaoQuatro);
            }
    }
}

function handleChoiceUser(index, listaOpcoes, opcaoDois, opcaoTres, opcaoQuatro) {

    switch (index) {
        case 0:
            console.log("jogando jogo")
            setPlayGame();
            break;
        case 1:
            listaOpcoes.style.display = "none";
            opcaoDois.style.display = "flex";
            isSecondaryMenuShowing=true;
            break;
        case 2:
            listaOpcoes.style.display = "none";
            opcaoTres.style.display = "flex";
            isSecondaryMenuShowing=true;
            break;
        case 3:
            listaOpcoes.style.display = "none";
            opcaoQuatro.style.display = "flex";
            isSecondaryMenuShowing=true;
            break;
        default:
            alert('aaaaaa')
            break;
    }

}

function CircleCollisions(p1x, p1y, r1, p2x, p2y, r2) {
    if (!isGameStarted) {
        return;
    }

    let radiusSum;
    let xDiff;
    let yDiff;
    radiusSum = r1 + r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;

    if (radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))) {
        return true;
    } else {
        return false;
    }

}

function DrawLifeShips(ctx) {
    let startX = 150;
    let startY = 50;
    let points = [[9, 9], [-9, 9]];
    ctx.strokeStyle = "white";
    for (let i = 0; i < lives; i++) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for (let j = 0; j < points.length; j++) {
            ctx.lineTo(startX + points[j][0], startY + points[j][1]);
        }
        ctx.closePath();
        ctx.stroke();
        startX -= 30;
    }
}