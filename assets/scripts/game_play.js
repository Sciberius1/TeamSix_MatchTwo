const fs = require('fs');
import { writeFileSync } from 'fs';

let playerName = 'Player 1';
let backgroundImage = '../assets/images/rainbow-flower-1.png';  // default background image
let cardBackImage = '../assets/images/troll_picnic.png';  // default card back image

// create an array called currentSessionStats to store the player's name, games played, fastest time, and average time per game
const currentSessionStats = [{
    playerName: 'Player 1',
    gamesPlayed: 0,
    fastestTime: null,
    avgTime: null,
    backgroundImage: '../assets/images/rainbow-flower-1.png',
    cardBackImage: '../assets/images/troll_picnic.png',
    completedTimes: []
}];


// create a function to record currentSessionStats for use in other modules
function recordCurrentSessionStats(playerName, backgroundImage, cardBackImage) {
    const playerStats = {
        playerName: playerName,
        gamesPlayed: 0,
        fastestTime: null,
        avgTime: null,
        backgroundImage: backgroundImage,
        cardBackImage: cardBackImage,
        completedTimes: []
    };
    currentSessionStats.push(playerStats);
    saveCurrentSessionStats();
}

// create a function to record the time taken to complete a game
function recordGameTime(playerName, timeTaken) {
    const playerStats = currentSessionStats.find(stats => stats.playerName === playerName);
    if (playerStats) {
        if (!playerStats.completedTimes) {
            playerStats.completedTimes = [];
        }
        playerStats.completedTimes.push(timeTaken);
        playerStats.gamesPlayed += 1;
        playerStats.fastestTime = playerStats.fastestTime === null ? timeTaken : Math.min(playerStats.fastestTime, timeTaken);
        playerStats.avgTime = playerStats.completedTimes.reduce((a, b) => a + b, 0) / playerStats.completedTimes.length;
    }
}

//reset the current session stats
function resetCurrentSessionStats() {
    currentSessionsStats.forEach(playerStats => {
        playerStats.gamesPlayed = 0;
        playerStats.fastestTime = null;
        playerStats.averageTimePerGame = null;
        playerStats.completedTimes = [];
    });
}

// create a function to save the current session stats to a file
function saveCurrentSessionStats() {
    const data = JSON.stringify(currentSessionsStats, null, 2);
    writeFileSync('records.json', data, 'utf8');
}