class Player extends Entity {
    constructor({id, x, y, gameState}) {
        super({id, x, y, gameState});

        // The value that the user currently has in the input box
        this.currentWord = "";
        
        // Elements we'll need to control
        this.inputBox = document.getElementById("text-input-box");
        this.launchButton = document.getElementById("launch-button");

        // Score stats on the bottom of the screen
        this.healthbar = document.getElementById("healthbar");
        this.scoreText = document.getElementById("score");
        this.wordCount = document.getElementById("word-count");
    }

    handleEnterDown() {
        // Find a word that matches whatever the player submitted
        const currentWord = this.inputBox.value.toLowerCase();
        const wordMatch = this.gameState.entities.find((entity) => 
            entity.constructor.name == "Word" 
            && entity.word == currentWord);
        
        // Animate the launch button
        this.launchButton.classList.add("pressed");
        
        if (wordMatch) {
            wordMatch.setGreenValue(true);
            
            // Launch a rocket to destroy the asteroid
            const rocket = new Rocket({
                id: randInt(0, 100000000),
                x: wordMatch.x,
                y: this.gameState.screenHeight + 100,
                gameState: this.gameState,
                wordEntity: wordMatch,
                speed: 5,
                explosionProximity: 20
            })
            this.gameState.addEntity(rocket);
        }

        // Clear the input box
        this.inputBox.value = "";
    }

    handleEnterUp() {
        this.launchButton.classList.remove("pressed");
    }

    update() {
        this.handlePlayerInput();
    }

    draw(canvasContext) {
        this.healthbar.style.width = `${this.gameState.health}%`;
        this.scoreText.innerText = `Score: ${this.gameState.score}`;
        this.wordCount.innerText = `Words: ${this.gameState.wordCount}`;
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

            if (e.type === "keyup") {
                if (e.key === "Enter") {
                    this.handleEnterUp();
                }
            }
        }
    }
}