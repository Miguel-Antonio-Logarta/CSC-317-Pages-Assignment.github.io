class Rocket extends Entity {
    constructor({id, x, y, gameState, wordEntity, speed, explosionProximity}) {
        super({id, x, y, gameState});
        
        this.wordEntity = wordEntity;

        // Speed is in px per tick
        this.speed = speed;

        // Distance from asteroid before exploding
        this.explosionProximity = explosionProximity;

        // Configure the sprite
        this.image = new Sprite({
            imgSrc: "./resources/rocket.png",
            x: this.x,
            y: this.y,
            originX: 0,
            originY: 0
        })
        const { height, width } = this.image.getImageSize();
        this.image.setOrigin(width / 2, height / 2);
    }

    update() {
        if (this.wordEntity) {
            if (distance(this.x, this.y, this.wordEntity.x, this.wordEntity.y) <= this.explosionProximity) {
                // Destroy self and destroy the asteroid
                this.gameState.score += this.wordEntity.points;
                this.gameState.wordCount += 1;
                this.wordEntity.explode();
                this.gameState.removeEntityByInstance(this);
            }
            else {
                // Keep moving towards the asteroid
                this.y <= this.wordEntity.y ? this.y += this.speed : this.y -= this.speed;
            }
        } 

        this.image.setCoordinate(this.x, this.y);
    }

    draw(canvasContext) {
        this.image.draw(canvasContext);
    }
}