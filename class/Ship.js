
export default class Ship {
    constructor(canvasHeight, canvasWidth) {
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.thrusting = false;
        this.speed = 0.1;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15; 
        this.angle = 0; //em degrees
        this.strokeColor = 'white';
        this.noseX = canvasWidth / 2 + 15;
        this.noseY = canvasHeight / 2;
    }
    /**
     * Atualiza a rotação e move o ship;
     */
    Update(canvasHeight, canvasWidth) {
        let radians = this.angle / Math.PI * 180;
        
        /** Aumenta a velocidade */
        if(this.thrusting) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed
        }

        /** Verifica se o ship saiu da tela horizontalmente */
        if(this.x < -this.radius) {
            this.x =  canvasWidth;
        }
        if(this.x > canvasWidth+this.radius) {
            this.x =  -this.radius;
        }
        /** Verifica se o ship saiu da tela verticamente */
        if(this.y < -this.radius) {
            this.y = canvasHeight;
        }
        if(this.y > canvasHeight+this.radius) {
            this.y =  -this.radius;
        }

        /** Diminui a velocidade, quando não estão clicando na tecla */
        this.velX *= 0.99;
        this.velY *= 0.99;

        //muda a localizacao da nave?
        this.x -= this.velX;
        this.y -= this.velY;

    }

    /**
     * Rotaciona a nave
     * @param {*} dir Direção (aceita 1 ou -1;)
     */
    Rotate(dir) {
        this.angle += this.rotateSpeed * dir
    }

    Draw(ctx) {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();

        let verticeAngle = ((Math.PI *2) / 3);
        let radians = this.angle / Math.PI * 180;
        this.noseX = this.x - this.radius * Math.cos(radians);
        this.noseY = this.y - this.radius * Math.sin(radians);

        /** Pega 360º deg, divide em 3 (triângulo) e desenha nas pontas desse circulo */
        for(let i=0; i<3; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(verticeAngle * i + radians), this.y - this.radius * Math.sin(verticeAngle * i + radians))
        }

        ctx.closePath();
        ctx.stroke();
    }

}
