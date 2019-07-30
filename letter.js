function letter(value) {
    this.letter = value;
    this.guessed = false;

    this.toString = function() {
        if (this.letter === " ") {
            this.guessed = true;
            return " ";
        }   else {
            return this.letter;
        }
    }
};

this.guess = function(guess) {
    if (guess === this.letter) {
        this.guessed = true;
    }
};

module.exports = Letter; 