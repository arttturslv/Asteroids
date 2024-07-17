export default class Bullet {
    constructor(angle, ship_noseX, ship_noseY) {
        this.visible = true;
        this.x = ship_noseX;
        this.y = ship_noseY;
        this.angle = angle;
        this.width = 4;
        this.height = 4;
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;
    }

    Update() {
        let radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }

    Draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
