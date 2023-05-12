class Sprite {
    // Object that holds the graphics
    constructor({imgSrc, x, y, originX, originY}) {
        this.imgSrc = imgSrc;
        this.x = x;
        this.y = y;
        this.originX = originX;
        this.originY = originY;
        this.image = new Image();
        this.image.src = imgSrc;
    }

    setOrigin(x, y) {
        this.originX = Math.floor(x);
        this.originY = Math.floor(y);
    }

    setPath(path) {
        this.path = path;
    }

    setCoordinate(x, y) {
        this.x = x;
        this.y = y;
    }

    getImageSize() {
        return {
            height: this.image.height,
            width: this.image.width
        }
    }

    draw(canvasContext) {
        canvasContext.drawImage(this.image, this.x - this.originX, this.y - this.originY);
    }
}