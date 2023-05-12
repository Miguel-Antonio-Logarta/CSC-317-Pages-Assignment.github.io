class Background extends Entity {
    constructor({imgSrc, id, x, y, gameState}) {
        super({id, x, y, gameState});
        
        this.image = new Sprite({
            imgSrc: imgSrc, 
            x: 0,
            y: 0,
            originX: 0,
            originY: 0,
        });
    }

    draw(canvasContext) {
        this.image.draw(canvasContext);
    }
}