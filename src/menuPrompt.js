class MenuPrompt extends Entity {
    constructor({id, x, y, gameState, game}) {
        super({id, x, y, gameState});
    
        this.game = game;
    }

    update() {
        this.handlePlayerInput();
    }

    draw(canvasContext) {
        canvasContext.font = "64px Upheaval";
        canvasContext.textAlign = "center";
        canvasContext.fillStyle = "white";
        canvasContext.fillText("Press Enter to Start", this.gameState.screenWidth / 2, this.gameState.screenHeight / 2);
        canvasContext.strokeText("Press Enter to Start", this.gameState.screenWidth / 2, this.gameState.screenHeight / 2);
    }

    handleEnterDown() {
        // Start the game
        this.gameState.entities = this.game.levels["startGame"];
    }

    handlePlayerInput() {
        // Respond to event queue
        while (this.gameState.eventQueue.length > 0) {
            const e = this.gameState.eventQueue.shift();
            
            if (e.type === "keydown") {
                if (e.key === "Enter") {
                    this.handleEnterDown();
                }
            }
        }
    }
}