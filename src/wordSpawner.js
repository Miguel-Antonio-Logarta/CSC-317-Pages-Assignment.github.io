// Spawns words on top of the screen
class WordSpawner extends Entity{
    constructor({id, x, y, gameState}) {
        super({id, x, y, gameState});
        this.wordBank = wordBank;
        this.spawnFrequency = 0.5;
        this.spawnTimer = 1/self.spawnFrequency;
    }

    createWord() {
        // Select a random word and create a new entity
        const newWord = this.wordBank[randInt(0, this.wordBank.length - 1)];
        const spawnWord = new Word({
            id: randInt(0, 10000000000),
            x: randInt(100, 924),
            y: -50,
            gameState: this.gameState,
            word: newWord
        })
        this.gameState.entities.push(spawnWord);
    }

    canSpawnWord() {
        if (this.gameState.time % 100 === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    setFrequency(t) {
        this.spawnFrequency = t;
        return this.spawnFrequency;
    }

    setSpawnTimer(t) {
        this.spawnTimer = 1 / this.setFrequency(t);
        return this.spawnTimer;
    }

    spawnRate(t, a, b) {
        return 0.0001 * t;
    }

    update() {
        if (this.canSpawnWord()) {
            this.createWord();
        }
    }
}