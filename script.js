const words = ['hangman', 'javascript', 'programming', 'web', 'coding', 'developer'];

let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let attempts = 6;

const wordContainer = document.getElementById('wordContainer');
const lettersContainer = document.getElementById('lettersContainer');
const message = document.getElementById('message');
const hintButton = document.getElementById('hintButton');
const retryButton = document.getElementById('retryButton');

function displayWord() {
    wordContainer.innerHTML = chosenWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
}

function displayLetters() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    lettersContainer.innerHTML = alphabet
        .split('')
        .map(letter => `<button onclick="guess('${letter}')" ${guessedLetters.includes(letter) ? 'disabled' : ''}>${letter}</button>`)
        .join(' ');
}

function guess(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!chosenWord.includes(letter)) {
            attempts--;
        }
        if (attempts === 0) {
            endGame('Game Over! The word was ' + chosenWord);
        } else {
            displayWord();
            displayLetters();
            checkWin();
        }
    }
}

function checkWin() {
    if (chosenWord.split('').every(letter => guessedLetters.includes(letter))) {
        endGame('Congratulations! You won!');
    }
}

function endGame(msg) {
    message.textContent = msg;
    lettersContainer.innerHTML = '';
    hintButton.style.display = 'none';
    retryButton.style.display = 'block';
}

function retry() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attempts = 6;
    message.textContent = '';
    displayWord();
    displayLetters();
    hintButton.style.display = 'block';
    retryButton.style.display = 'none';
}

function giveHint() {
    const hiddenLetterIndex = chosenWord.split('').findIndex(letter => !guessedLetters.includes(letter));
    if (hiddenLetterIndex !== -1) {
        guessedLetters.push(chosenWord[hiddenLetterIndex]);
        displayWord();
        displayLetters();
    }
}

displayWord();
displayLetters();
retryButton.style.display = 'none';
hintButton.addEventListener('click', giveHint);
retryButton.addEventListener('click', retry);
