import { WORDS } from "./words/words.js";

const NUMBER_OF_GUESSES = 5;
let REMAINING_GUESSES = NUMBER_OF_GUESSES;

const gameBoard = document.querySelector(".game-container");

let randomizedWord = getWord(WORDS);// WORDS[Math.floor(Math.random() * WORDS.length)];
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

    createButton();

}


function createButton() {

    const resetBtn = document.createElement("button");
    resetBtn.classList.add("reset-button");
    resetBtn.innerHTML = "RESET BOARD";
    resetBtn.tabIndex = "-1";
    gameBoard.appendChild(resetBtn);
    resetBtn.addEventListener("click", resetGame);

}


function getWord(list) {
    return list[Math.floor(Math.random() * WORDS.length)];
}


function updateTileContent() {

    const boxes = returnBoxes();

    if (!boxes) return;

    for (let i = 0; i < boxes.length; i++) {
        if (!userInput[i]) {
            boxes[i].innerHTML = "";
        }
        else {
            boxes[i].innerHTML = userInput[i];
        }
    }

}


function returnBoxes() {

    const rows = document.querySelectorAll(".row");
    let currentRow = rows[NUMBER_OF_GUESSES - REMAINING_GUESSES];

    if (!currentRow) return;

    const boxes = currentRow.querySelectorAll(".tile");

    return boxes;

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


function checkGuess(word) {

    let searchWord = userInput.join("").toLowerCase();
    let foundWord = false;

    for (let i = 0; i < WORDS.length; i++) {
        if (searchWord == WORDS[i]) {
            foundWord = true;
        }
    }
    if (!foundWord) {
        alert(`${searchWord.toUpperCase()} isn't a valid word.`);
        return;
    }

    let rightGuess = Array.from(word.toUpperCase());

    if (userInput.length < 5) {
        alert("You must introduce five letters!");
        return;
    }
    else if (REMAINING_GUESSES == 0) {
        alert("You dont have any guesses remaining :(");
    }
    // TODO:
    // - If a letter in the user input is in the randomized word, turn tile yellow.

    let rowBoxes = returnBoxes();

    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] == rightGuess[i]) {

            rowBoxes[i].classList.add("green-tile");
            rightGuess[i] = "#";

        }

        else {
            for (let j = 0; j < rightGuess.length; j++) {

                if (userInput[i] == rightGuess[j]) {

                    if (rowBoxes[i].classList.contains("yellow-tile")) continue;

                    rowBoxes[i].classList.add("yellow-tile");
                    rightGuess[j] = "#";

                }
            }
        }
    }

    if (userInput.join("") == randomizedWord.toUpperCase()) {
        setTimeout(() => {
            alert(`The word was ${randomizedWord.toUpperCase()} so you won the game!`);
        }, 500)
    }

    userInput = [];
    REMAINING_GUESSES -= 1;

}


function resetGame() {

    randomizedWord = getWord(WORDS);
    REMAINING_GUESSES = NUMBER_OF_GUESSES;
    userInput = [];
    const tiles = document.querySelectorAll(".tile");

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML = "";
        tiles[i].classList.remove("green-tile");
        tiles[i].classList.remove("yellow-tile");
    }

}


document.addEventListener("keydown", (e) => {
    let pressedKey = e.key;

    if (pressedKey == "Backspace") {
        removeLetter();
        return;
    }
    if (pressedKey == "Enter") {
        checkGuess(randomizedWord);
        return;
    }

    let foundKey = pressedKey.match(/[a-z]/gi);
    if (!foundKey || foundKey.length > 1) {
        return;
    }
    else {
        insertLetter(pressedKey.toUpperCase());
    }
});


initBoard();