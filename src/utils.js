function randInt(min, max) {
    // Returns a number between min and max inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function beginsWith(beginsStr, wholeStr) {
    // Checks if wholeStr begins with beginsStr
    if (beginsStr.length > wholeStr) {
        return false;
    }
    for (let i = 0; i < beginsStr.length; i++) {
        if (beginsStr[i] !== wholeStr[i]) {
            return false;
        }
    }
    return true;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}