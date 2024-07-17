export default class Asteroid {
    constructor(canvasHeight, canvasWidth) {
        this.visible = true;
        this.x =  Math.floor(Math.random() * canvasWidth);
        this.y =  Math.floor(Math.random() * canvasHeight);
        this.speed = 1;
        this.radius = 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = "white";
    }
    Update(canvasHeight, canvasWidth) {
        let radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;

        /** Verifica se o asteroid saiu da tela horizontalmente */
        if(this.x < this.radius) {
            this.x =  canvasWidth;
        }
        if(this.x > canvasWidth) {
            this.x =  this.radius;
        }
        /** Verifica se o asteroid saiu da tela verticamente */
        if(this.y < this.radius) {
            this.y = canvasHeight;
        }
        if(this.y > canvasHeight) {
            this.y =  this.radius;
        }
    }

    Draw(ctx) {
        ctx.beginPath();
        let verticeAngle = ((Math.PI * 2)/6);
        var radians =  this.angle / Math.PI * 180;

        /** Pega 360º deg, divide em 6 e desenha nas pontas desse circulo */
        for(let i=0; i<6; i++) {
            ctx.lineTo(this.x - this.radius * Math.cos(verticeAngle * i + radians), this.y - this.radius * Math.sin(verticeAngle * i + radians))
        }

        ctx.closePath();
        ctx.stroke();
    }
}