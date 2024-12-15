//import cardBackImage from './scripts/currentSessionStats.json';
import { cardBackImage } from './scripts/currentSessionStats.json';
import { createPlayingField } from './scripts/playing_field.js';

// load all card images
const cardImages = [];
const context = require.context('../images/cards', false, /\.png$/);
context.keys().forEach((key) => {
    cardImages.push(context(key));
});

// populate the playing field with cards
const playingField = createPlayingField(cardImages, 4); // 4 matched pairs

// Assuming you have a function to render the playing field
renderPlayingField(playingField);
function renderPlayingField(playingField) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    playingField.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;

        const cardFront = document.createElement('img');
        cardFront.src = card.image;
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('img');
        cardBack.src = cardBackImage;
        cardBack.classList.add('card-back');

        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        gameContainer.appendChild(cardElement);

        cardElement.addEventListener('click', () => {
            flipCard(cardElement);
        });
    });
}

let firstCard, secondCard;
let lockBoard = false;

function flipCard(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    cardElement.classList.add('flip');

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    if (document.querySelectorAll('.card:not(.flip)').length === 0) {
        endGame();
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function endGame() {
    alert('Congratulations! You won in x minutes and y seconds!');}

    let startTime;
    let playerName = 'Player1'; // This should be dynamically set based on the current session
    let gamesPlayed = 0;

    function startTimer() {
        startTime = new Date();
    }

    function getElapsedTime() {
        const now = new Date();
        const elapsedTime = now - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = ((elapsedTime % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateSessionStats() {
        gamesPlayed += 1;
        // Assuming you have a function to save session stats
        saveSessionStats({ playerName, gamesPlayed });
    }

    function saveSessionStats(stats) {
        // Implement the logic to save stats, e.g., localStorage or a server call
        localStorage.setItem('sessionStats', JSON.stringify(stats));
    }

    document.addEventListener('DOMContentLoaded', () => {
        startTimer();
    });

    function endGame() {
        const elapsedTime = getElapsedTime();
        alert(`Congratulations! You won in ${elapsedTime} minutes!`);
        updateSessionStats();
    }