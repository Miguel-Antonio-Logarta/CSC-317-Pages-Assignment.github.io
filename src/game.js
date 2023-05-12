class Game {  

    constructor(canvasID, fps) {
        // Settings
        this.canvasID = canvasID;
        this.gameFPS = fps;
        this.gameWidth = 1024;
        this.gameHeight = 576;
        this.backgroundImgSrc = "./resources/background.png";

        // Canvas
        const canvas = document.getElementById(canvasID);
        this.canvasContext = canvas.getContext("2d");

        // Game state that holds data of our game
        this.gameState = new GameState({
            screenWidth: this.gameWidth,
            screenHeight: this.gameHeight
        })

        // Levels
        this.levels = {
            menu: [
                new Background({
                    imgSrc: this.backgroundImgSrc,
                    id: randInt(0, 1000000000),
                    x: 0,
                    y: 0,
                    gameState: this.gameState
                }),
                new MenuPrompt({
                    id: randInt(0, 1000000000),
                    x: 0,
                    y: 0,
                    gameState: this.gameState,
                    game: this
                })
            ],
            startGame: [
                new Player({
                    id: randInt(0, 1000000000),
                    x: 0,
                    y: 0,
                    gameState: this.gameState 
                }),
                new WordSpawner({
                    id: randInt(0, 1000000000),
                    x: 0,
                    y: 0,
                    gameState: this.gameState
                }),
                new Background({
                    imgSrc: this.backgroundImgSrc,
                    id: randInt(0, 1000000000),
                    x: 0,
                    y: 0,
                    gameState: this.gameState
                })
            ],
            gameOver: [
                new Background({
                    imgSrc: this.backgroundImgSrc,
                    id: randInt(0, 1000000000),
                    x: 0,
                    y: 0,
                    gameState: this.gameState
                }),
                new GameOver({
                    imgSrc: this.backgroundImgSrc,
                    id: randInt(0, 1000000000),
                    x: 0,
                    y: 0,
                    gameState: this.gameState,
                    game: this
                })
            ]
        }

        this.gameState.entities = this.gameState.entities.concat(this.levels.menu);
    };

    update() {        
        // Call update on every entity
        // console.log(this.gameState.entities);
        this.gameState.entities.forEach((entity) => {
            // console.log(entity);
            entity.update();
        })

        // Time tick
        this.gameState.tick(1);

        if (this.gameState.health <= 0) {
            this.gameState.entities = [];
            this.gameState.entities = this.levels.gameOver;
        }
    }

    render() {
        // Clear the screen
        this.canvasContext.clearRect(0, 0, this.gameWidth, this.gameHeight);

        // Draw all the entities on the screen
        this.gameState.entities.forEach((entity) => {
            entity.draw(this.canvasContext);
        })
    }

    run() {
        this.update();
        this.render();
    }

    start() {
        this.canvasContext.canvas.width = this.gameWidth;
        this.canvasContext.canvas.height = this.gameHeight;
        setInterval(() => this.run(), 1000/this.gameFPS);
    }

    handleKeyDown(event) {
        this.gameState.eventQueue.push(event);
    }

    handleKeyUp(event) {
        this.gameState.eventQueue.push(event);
    }
}