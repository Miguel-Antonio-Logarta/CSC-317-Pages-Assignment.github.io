class GameOver extends Entity {
    constructor({id, x, y, gameState, game}) {
        super({id, x, y, gameState});

        this.healthbar = document.getElementById("healthbar");
    }
    
    update() {
        this.healthbar.style.width = `${this.gameState.health}%`;
    }

    draw(canvasContext) {
        canvasContext.font = "64px Upheaval";
        canvasContext.textAlign = "center";
        canvasContext.fillStyle = "white";
        canvasContext.fillText("Game Over!", this.gameState.screenWidth / 2, this.gameState.screenHeight / 2);
        canvasContext.strokeText("Game Over!", this.gameState.screenWidth / 2, this.gameState.screenHeight / 2);
    }
}