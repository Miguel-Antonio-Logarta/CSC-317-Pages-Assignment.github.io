const entityTypes = {
    background: 0,
    word: 1,
    player: 2,
    rocket: 3
}

class Entity {
    // Base class that holds the id, coordinates, knowledge of gameState
    constructor({id, x, y, gameState}) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.gameState = gameState;
    }

    update() {

    }

    draw(canvasContext) {
        
    }
}