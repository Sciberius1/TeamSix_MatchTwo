import { backgroundImages, cardBacks, cardFronts } from './playing_field.js';
const scores = require("./records.json")
// Options menu popup
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.createElement('div');
    popup.id = 'optionsPopup';
    popup.style.display = 'none';
    popup.innerHTML = `
        <h2>Options Menu</h2>
        <label for="playerName">Player Name:</label>
        <input type="text" id="playerName" name="playerName">
        <button id="submitName">Submit</button>
        <button id="resetStats">Reset Stats</button>
        <label for="backgroundImage">Background Image:</label>
        <select id="backgroundImage"></select>
        <label for="cardBack">Card Back:</label>
        <select id="cardBack"></select>
        <label for="cardFront">Card Front:</label>
        <select id="cardFront"></select>
        <button id="newGame">New Game</button>
        <button id="quitGame">Quit</button>
    `;
    document.body.appendChild(popup);

    const playerNameInput = document.getElementById('playerName');
    const submitNameButton = document.getElementById('submitName');
    const resetStatsButton = document.getElementById('resetStats');
    const backgroundImageSelect = document.getElementById('backgroundImage');
    const cardBackSelect = document.getElementById('cardBack');
    const cardFrontSelect = document.getElementById('cardFront');
    const newGameButton = document.getElementById('newGame');
    const quitGameButton = document.getElementById('quitGame');

    // Populate backgroundImageSelect, cardBackSelect, and cardFrontSelect with options from playing_field.js
    // Assuming playing_field.js exports arrays: backgroundImages, cardBacks, cardFronts

    backgroundImages.forEach(image => {
        const option = document.createElement('option');
        option.value = image;
        option.textContent = image;
        backgroundImageSelect.appendChild(option);
    });

    cardBacks.forEach(card => {
        const option = document.createElement('option');
        option.value = card;
        option.textContent = card;
        cardBackSelect.appendChild(option);
    });

    cardFronts.forEach(card => {
        const option = document.createElement('option');
        option.value = card;
        option.textContent = card;
        cardFrontSelect.appendChild(option);
    });

    submitNameButton.addEventListener('click', () => {
        const playerName = playerNameInput.value;
        if (playerName) {
            localStorage.setItem('playerName', playerName);
        } else {
            alert('Please enter a player name.');
        }
    });

    resetStatsButton.addEventListener('click', () => {
        // Reset stats logic here
    localStorage.setItem('gamesPlayed', 0);
    localStorage.setItem('bestTime', null);
    localStorage.setItem('averageTime', null);
    alert('Stats have been reset.');
    });

    newGameButton.addEventListener('click', () => {
        import('./game_play.js').then(module => {
            module.startNewGame();
        }).catch(err => {
            console.error('Failed to load game_play.js:', err);
        });
    });

    quitGameButton.addEventListener('click', () => {
        // Store current stats to records.json and quit game logic here
        const stats = {
            playerName: localStorage.getItem('playerName'),
            gamesPlayed: localStorage.getItem('gamesPlayed'),
            bestTime: localStorage.getItem('bestTime'),
            averageTime: localStorage.getItem('averageTime')
        };

        fetch('/path/to/records.json', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(stats)
        }).then(response => {
            if (response.ok) {
            alert('Stats saved successfully.');
            window.close(); // Close the window
            } else {
            alert('Failed to save stats.');
            }
        }).catch(error => {
            console.error('Error saving stats:', error);
            alert('Error saving stats.');
        });
    });
});