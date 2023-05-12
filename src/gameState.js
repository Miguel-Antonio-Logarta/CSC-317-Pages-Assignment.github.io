// Responsible for holding global state of the game.
// This is going to be the object that we pass around to the entities.
// Current level, player health, commands, etc...
class GameState {
    constructor({screenWidth, screenHeight}) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.health = 100;
        this.score = 0;
        this.time = 0;
        this.wordCount = 0;
        
        // Entities hold all the entities present on the screen
        this.entities = [];

        // Event queue holds key events
        this.eventQueue = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntityById(id) {
        this.entities = this.entities.filter((entity) => entity.id != id);
    }

    removeEntityByInstance(instance) {
        // Removes object based on reference instead of id
        this.entities = this.entities.filter((entity) => entity != instance);
    }

    addScore(points) {
        this.score += points;
    }

    setHealth(value) {
        this.health = value;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    addHealth(value) {
        this.health += value;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    tick(step = 1) {
        this.time = this.time += 1;
    }
}