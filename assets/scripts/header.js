import { getCurrentTime } from './assets/scripts/game_play.js';

// display a banner with the game title, using style attributes to set the font size, font weight, and text alignment from styles.css

// display display "Player Name: " + playerName from records.json in a div with the id 'player-name' on the bottom left of the header and "Current Time: " + currentTime from game_play.js on the bottom right of the header
// Assuming you have a function to fetch playerName from records.json
fetch('./assets/scripts/records.json')
    .then(response => response.json())
    .then(data => {
        const playerName = data.playerName;
        const playerNameDiv = document.createElement('div');
        playerNameDiv.id = 'player-name';
        playerNameDiv.style.position = 'absolute';
        playerNameDiv.style.bottom = '0';
        playerNameDiv.style.left = '0';
        playerNameDiv.textContent = "Player Name: " + playerName;
        document.querySelector('header').appendChild(playerNameDiv);
    });

// Assuming you have a function to get currentTime from game_play.js
const currentTime = getCurrentTime();
const currentTimeDiv = document.createElement('div');
currentTimeDiv.id = 'current-time';
currentTimeDiv.style.position = 'absolute';
currentTimeDiv.style.bottom = '0';
currentTimeDiv.style.right = '0';
currentTimeDiv.textContent = "Current Time: " + currentTime;
document.querySelector('header').appendChild(currentTimeDiv);
