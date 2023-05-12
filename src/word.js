const asteroidVariants = {
    variant1: "./resources/asteroidBig1.png",
    variant2: "./resources/asteroidBig2.png"
}

const explosionsSrc = {
    explosion1: "./resources/explosionBig1.png",
    explosion2: "./resources/explosionBig2.png",
    explosion3: "./resources/explosionBig3.png",
    explosion4: "./resources/explosionBig4.png",
    explosion5: "./resources/explosionBig5.png",
}

// Words that fall down from the top
class Word extends Entity {
    constructor({id, x, y, gameState, word}) {
        super({id, x, y, gameState});
        this.word = word;

        // Determine points and attack dmg
        this.points = 10*this.word.length;
        this.attackDmg = 100*Math.pow(Math.E, -1 * this.word.length);
        if (this.attackDmg < 10) {
            this.attackDmg = 10;
        }

        // Select a asteroid sprite variant
        const asteroidKeys = Object.keys(asteroidVariants);
        this.asteroidVariantSrc = asteroidVariants[asteroidKeys[randInt(0, asteroidKeys.length - 1)]];

        // Configure asteroid image and explosion animation
        this.images = {
            asteroid: new Sprite({
                imgSrc: this.asteroidVariantSrc,
                x: this.x,
                y: this.y,
                originX: 0,
                originY: 0
            }),
            explosion: {
                numOfFrames: 5,
                ticksPerFrame: 5,
                frames: [
                    new Sprite({
                        imgSrc: explosionsSrc.explosion1,
                        x: this.x,
                        y: this.y,
                        originX: 0,
                        originY: 0
                    }),
                    new Sprite({
                        imgSrc: explosionsSrc.explosion2,
                        x: this.x,
                        y: this.y,
                        originX: 0,
                        originY: 0
                    }),
                    new Sprite({
                        imgSrc: explosionsSrc.explosion3,
                        x: this.x,
                        y: this.y,
                        originX: 0,
                        originY: 0
                    }),
                    new Sprite({
                        imgSrc: explosionsSrc.explosion4,
                        x: this.x,
                        y: this.y,
                        originX: 0,
                        originY: 0
                    }),
                    new Sprite({
                        imgSrc: explosionsSrc.explosion5,
                        x: this.x,
                        y: this.y,
                        originX: 0,
                        originY: 0
                    })
                ]
            }
        }

        // Center the origin of all the sprites
        const { height: asteroidHeight, width: asteroidWidth } = this.images.asteroid.getImageSize();
        const { height: explosionHeight, width: explosionWidth } = this.images.explosion.frames[0].getImageSize();
        this.images.asteroid.setOrigin(asteroidWidth / 2, asteroidHeight / 2);
        this.images.explosion.frames[0].setOrigin(explosionWidth / 2, explosionHeight / 2);
        this.images.explosion.frames[1].setOrigin(explosionWidth / 2, explosionHeight / 2);
        this.images.explosion.frames[2].setOrigin(explosionWidth / 2, explosionHeight / 2);
        this.images.explosion.frames[3].setOrigin(explosionWidth / 2, explosionHeight / 2);
        this.images.explosion.frames[4].setOrigin(explosionWidth / 2, explosionHeight / 2);
        
        // Store time since last animation
        this.timeSinceLastAnimation = 0;
        this.currentImage = this.images.asteroid;
        this.currentExplosionImage = 0;

        // To read value from input element
        this.inputBox = document.getElementById("text-input-box");

        this.setGreen = false;
        this.isExploding = false;
        this.setRed = false;
    }
    
    update() {
        if (this.isExploding) {
            if (this.currentExplosionImage === this.images.explosion.numOfFrames - 1) {
                this.gameState.removeEntityByInstance(this);
            }

            if (this.timeSinceLastAnimation % this.images.explosion.ticksPerFrame === 0) {
                this.currentExplosionImage += 1;
                this.currentImage = this.images.explosion.frames[this.currentExplosionImage];
            }
            this.timeSinceLastAnimation += 1;

            this.currentImage.setCoordinate(this.x, this.y);
        } else if (this.y > this.gameState.screenHeight) {
            this.gameState.addHealth(-1*this.attackDmg);
            this.setRedValue(true);
            this.explode();
        } else {
            this.y += 1;
            this.currentImage.setCoordinate(this.x, this.y);
        }
    }

    draw(canvasContext) {
        // Draw the asteroid
        this.currentImage.draw(canvasContext);

        // Draw the word
        this.colorMatchingLetters(this.inputBox.value, this.word, canvasContext);
    }

    colorMatchingLetters(str1, str2, canvasContext) {
        let x = this.x;
        let y = this.y;
        const wholeWordWidth = canvasContext.measureText(str2).width;
        const xOffset = x - wholeWordWidth / 2;
        
        canvasContext.font = "32px Upheaval";
        if (this.setGreen) {
            canvasContext.textAlign = "start";
            canvasContext.fillStyle = "green";
            canvasContext.fillText(str2, xOffset, y);
            canvasContext.strokeText(str2, xOffset, y);
        }
        else if (this.setRed) {
            canvasContext.textAlign = "start";
            canvasContext.fillStyle = "red";
            canvasContext.fillText(str2, xOffset, y);
            canvasContext.strokeText(str2, xOffset, y);
        }
        else if (beginsWith(str1, str2)) {
            canvasContext.textAlign = "start";
            canvasContext.fillStyle = "green";
            canvasContext.fillText(str1, xOffset, y);
            canvasContext.strokeText(str1, xOffset, y);
            
            const newOffset = xOffset + canvasContext.measureText(str1).width;
            canvasContext.textAlign = "start";
            canvasContext.fillStyle = "white";
            canvasContext.fillText(str2.slice(str1.length), newOffset, y);
            canvasContext.strokeText(str2.slice(str1.length), newOffset, y);
        } else {
            canvasContext.textAlign = "start";
            canvasContext.fillStyle = "white";
            canvasContext.fillText(str2, xOffset, y);
            canvasContext.strokeText(str2, xOffset, y);
        }
    }

    setGreenValue(val) {
        this.setGreen = val;
    }

    setRedValue(val) {
        this.setRed = val;
    }

    explode() {
        this.isExploding = true;
        this.currentImage = this.images.explosion.frames[0];
    }
}