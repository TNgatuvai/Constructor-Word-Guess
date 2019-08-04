var Word = require("./word.js");
var inquirer = require("inquirer");

var picked;
var pickedWord;
var guesses;
var guessesLeft;

// random prhases and words
var wordBank = ["Game Time", "I'm Hungry", "Speed", "Get down with it", "Under the Sea", "What Goes Up Must Come Down", "Believe", "Super Bowl Champions", "Drive Me Nuts", "Acupuncture", "Lebron James", "Not the Sharpest Tool in the Shed", "Forever", "Utah Jazz", "Rino", "USA", "You are what you think"];

// random selection of word for game play
function randomWord(wordBank) {
    var index = Math.floor(Math.random() * wordBank.length);
    return wordBank[index];
}

// prompts for guess
var questions = [{
    name: 'letterGuessed',
    message: 'Guess a letter',
    validate: function (value) {
        var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1);
        return valid || 'Please enter a letter';
    },
    when: function () {
        return (!picked.allGuessed() && guessesLeft > 0);
    }
},
// reference of professor falcon is from the film war games in the 80s
{
    type: 'confirm',
    name: 'playAgain',
    message: 'Do you want to play again professor falcon?',

    when: function () {
        return (picked.allGuessed() || guessesLeft <= 0);
    }
}
];

// game reset

function resetGame() {
    pickedWord = randomWord(wordBank);
    picked = new Word(pickedWord);
    picked.makeGuess(' ');
    guesses = [];
    guessesLeft = 10;
}

function game() {
    if (!picked.allGuessed() && guessesLeft > 0) {
        console.log(picked + '');
    }

    inquirer.prompt(questions).then(answers => {
        if ('playAgain' in answers && !answers.playAgain) {
            console.log('thanks for playing');
            process.exit();
        }
        if (answers.playAgain) {
            resetGame();
        }
        if (answers.hasOwnProperty('letterGuessed')) {
            var currentGuess = answers.letterGuessed.toLowerCase();

            if (guesses.indexOf(currentGuess) === -1) {
                guesses.push(currentGuess);
                picked.makeGuess(currentGuess);
                if (pickedWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                    guessesLeft--;
                }
            } else {
                console.log('You have already guessed that letter', currentGuess);
            }
        }

        if (!picked.allGuessed()) {
            if (guessesLeft < 1) {
                console.log('sorry, no more guesses');
                console.log(pickedWord, 'that is correct.');

            } else {
                console.log('guesses so far:', guesses.join(' '));
                console.log('guesses remainig:', guessesLeft);
            }
        } else {
            console.log(pickedWord, 'is the correct word!');
        }

        game();
    });
}

resetGame();

game();