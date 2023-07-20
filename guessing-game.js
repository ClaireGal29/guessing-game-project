const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let secretNumber;
let numAttempts;

const randomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)  + min);
};

const checkGuess = num => {
    if (Number(num) < secretNumber) {
        console.log("Too low!");
        return false;
    }
    else if (Number(num) > secretNumber) {
        console.log("Too high!");
        return false;
    }
    else {
        console.log("Well done! You win!")
        return true;
    }
};

const askGuess = (num) => {
    numAttempts --;
    if (checkGuess(num) !== true && numAttempts === 0) {
        console.log("No attempts remaining. You lose!");
    }
    else if (checkGuess(num) !== true && numAttempts > 0) {
        console.log("You have " + numAttempts + " attempts remaining.")
        return rl.question("Enter a guess. ", askGuess);

    }
    rl.close();

};

const askRange = minNum => {
    rl.question("Enter a maximum number: ", maxNum => {
            console.log("I'm thinking of a number between " + minNum + " and " + maxNum + ".");
            let min = Number(minNum);
            let max = Number(maxNum);
            secretNumber = randomInRange(min, max);
            rl.question("Enter a guess: ", askGuess);
    });
};

const askLimit = limit => {
    numAttempts = limit;
    rl.question("Enter a minimum number: ", askRange);
};

rl.question("How many guesses would you like? ", askLimit);
