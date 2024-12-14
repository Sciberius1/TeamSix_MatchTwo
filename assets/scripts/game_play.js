const fs = require('fs');
import { writeFileSync } from 'fs';

// create an array called currentSessionsStats to store the player's name, games played, fastest time, and average time per game
const currentSessionsStats = [];

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
    currentSessionsStats.push(playerStats);
    saveCurrentSessionStats();
}

// create a function to record the time taken to complete a game
function recordGameTime(playerName, timeTaken) {
    const playerStats = currentSessionsStats.find(stats => stats.playerName === playerName);
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