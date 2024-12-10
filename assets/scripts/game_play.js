// TODO: create the game play logic
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let startTime;

// TODO: create a function to start the game
function startGame() {
    startTime = new Date();
    generateField();
}


// TODO: generate a field of 4x4 cells with 8 pairs of random numbers from 1 to 8
function generateField() {
    const field = document.getElementById('game-field');
    const numbers = [...Array(8).keys()].map(n => n + 1).flatMap(n => [n, n]);
    numbers.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.number = numbers[i];
        cell.addEventListener('click', onCardClick);
        field.appendChild(cell);
    }
}


// TODO: add a click event listener to each cell
function onCardClick(event) {
    if (lockBoard) return;
    const cell = event.target;
    if (cell === firstCard) return;

// TODO: on click, reveal the card face
    cell.classList.add('reveal');
    cell.textContent = cell.dataset.number;

    if (!firstCard) {
        firstCard = cell;
        return;
    }

    secondCard = cell;
    lockBoard = true;

// TODO: if two cards are revealed, check if they match, if they match keep them revealed, if they don't match, hide the card face after a two second delay 
    if (firstCard.dataset.number === secondCard.dataset.number) {
        matches++;
        resetCards();
        if (matches === 8) {
            endGame();
        }
    } else {
        setTimeout(hideCards, 2000);
    }
}

// TODO: if they don't match, hide the card faces
function hideCards() {
    firstCard.classList.remove('reveal');
    secondCard.classList.remove('reveal');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetCards();
}

function resetCards() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// TODO: if all cards are revealed, display a message with the time it took to complete the game
function endGame() {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    alert(`Congratulations! You completed the game in ${timeTaken} seconds.`);
    
    // Add completion time to local storage and increment the number of games played
    const records = JSON.parse(localStorage.getItem('records')) || { gamesPlayed: 0, fastestTime: null, totalTime: 0 };

    records.gamesPlayed++;
    records.totalTime += timeTaken;

    if (!records.fastestTime || timeTaken < records.fastestTime) {
        records.fastestTime = timeTaken;
    }

    localStorage.setItem('records', JSON.stringify(records));

    const averageTime = (records.totalTime / records.gamesPlayed).toFixed(2);
    alert(`Fastest Time: ${records.fastestTime} seconds\nAverage Time: ${averageTime} seconds`);

    // Add prompt to continue playing or to view the leaderboard
    const continuePlaying = confirm('Would you like to play again?');
    if (continuePlaying) {
        const field = document.getElementById('game-field');
        field.innerHTML = '';
        startGame();
    } else {
        const viewLeaderboard = confirm('Would you like to view the leaderboard?');
        if (viewLeaderboard) {
            displayLeaderboard();
        }
    }
}

// TODO: if the player chooses to continue playing, generate a new field of cards
document.getElementById('start-button').addEventListener('click', startGame);
