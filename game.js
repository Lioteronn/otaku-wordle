import { WORDS } from "./words/words.js";

const NUMBER_OF_GUESSES = 5;
let REMAINING_GUESSES = NUMBER_OF_GUESSES;

const gameBoard = document.querySelector(".game-container");

let randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
let userInput = [];


function initBoard() {
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {

        let row = document.createElement("div");
        row.classList.add("row");
        gameBoard.appendChild(row);

        for (let j = 0; j < 5; j++) {

            let tile = document.createElement("div");
            tile.classList.add("tile");
            row.appendChild(tile);

        }
    }
}

function updateTileContent() {
    const rows = document.querySelectorAll(".row");
    let currentRow = rows[NUMBER_OF_GUESSES - REMAINING_GUESSES];

    if (!currentRow) return;

    const boxes = currentRow.querySelectorAll(".tile");

    for (let i = 0; i < boxes.length; i++) {
        if (!userInput[i]) {
            boxes[i].innerHTML = "";
        }
        else {
            boxes[i].innerHTML = userInput[i];
        }
    }
}

function insertLetter(letter) {
    if (userInput.length >= NUMBER_OF_GUESSES) {
        return;
    }
    userInput.push(letter);
    updateTileContent();
}

function removeLetter() {
    userInput.pop();
    updateTileContent();
}

function checkGuess() {
    if (userInput.length < 5) {
        alert("You must introduce five letters!");
        return;
    }
    // TODO:
    // - If a letter in the user input is in the randomized word, turn tile yellow.
    // - If a letter in the user input is in the randomized word AND it is in the exact same position, turn tile yellow.
    // - Else, turn tile gray.
    userInput = [];
    REMAINING_GUESSES -= 1;
}

document.addEventListener("keydown", (e) => {
    let pressedKey = e.key;

    if (pressedKey == "Backspace") {
        removeLetter();
        return;
    }
    if (pressedKey == "Enter") {
        checkGuess();
        return;
    }

    let foundKey = pressedKey.match(/[a-z]/gi);
    if (!foundKey || foundKey.length > 1) {
        return;
    }
    else {
        insertLetter(pressedKey);
    }
});

initBoard();


