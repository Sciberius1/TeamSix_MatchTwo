const fs = require("fs");
import { writeFileSync } from "fs";

let playerName = "Player 1";
let backgroundImage = "../assets/images/backgrounds/rainbow-flower-1.png"; // default background image
let cardBackImage = "../assets/images/cardBacks/little_danish_droid.png"; // default card back image

// create an array called currentSessionStats to store the player's name, games played, fastest time, and average time per game
let currentSessionStats = [];

try {
  const data = fs.readFileSync("currentSessionStats.json", "utf8");
  currentSessionStats = JSON.parse(data);
} catch (err) {
  console.error("Error reading currentSessionStats.json:", err);
}

// create a function to record currentSessionStats for use in other modules
function recordCurrentSessionStats(playerName, backgroundImage, cardBackImage) {
  const playerStats = {
    playerName: playerName,
    gamesPlayed: 0,
    fastestTime: null,
    avgTime: null,
    backgroundImage: backgroundImage,
    cardBackImage: cardBackImage,
    completionTimes: []
  };
  currentSessionStats.push(playerStats);
  saveCurrentSessionStats();
}

// create a function to display currentSessionStats
function displayCurrentSessionStats() {
  const statsContainer = document.getElementById("statsContainer");
  statsContainer.innerHTML = ""; // Clear previous stats

  currentSessionStats.forEach((playerStats) => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player-stats");

    const playerName = document.createElement("h3");
    playerName.textContent = `Player: ${playerStats.playerName}`;
    playerDiv.appendChild(playerName);

    const gamesPlayed = document.createElement("p");
    gamesPlayed.textContent = `Games Played: ${playerStats.gamesPlayed}`;
    playerDiv.appendChild(gamesPlayed);

    const fastestTime = document.createElement("p");
    fastestTime.textContent = `Fastest Time: ${
      playerStats.fastestTime !== null ? playerStats.fastestTime + "s" : "N/A"
    }`;
    playerDiv.appendChild(fastestTime);

    const avgTime = document.createElement("p");
    avgTime.textContent = `Average Time: ${
      playerStats.avgTime !== null ? playerStats.avgTime + "s" : "N/A"
    }`;
    playerDiv.appendChild(avgTime);

    const backgroundImage = document.createElement("p");
    backgroundImage.textContent = `Background Image: ${playerStats.backgroundImage}`;
    playerDiv.appendChild(backgroundImage);

    const cardBackImage = document.createElement("p");
    cardBackImage.textContent = `Card Back Image: ${playerStats.cardBackImage}`;
    playerDiv.appendChild(cardBackImage);

    statsContainer.appendChild(playerDiv);
  });
}

// create a function to record the time taken to complete previous game to currentSessionStats
function recordGameTime(playerName, timeTaken) {
  const playerStats = currentSessionStats.find(
    (stats) => stats.playerName === playerName
  );
  if (playerStats) {
    if (!playerStats.completionTimes) {
      playerStats.completionTimes = [];
    }
    playerStats.completionTimes.push(timeTaken);
    playerStats.gamesPlayed += 1;
    playerStats.fastestTime =
      playerStats.fastestTime === null
        ? timeTaken
        : Math.min(playerStats.fastestTime, timeTaken);
    playerStats.avgTime =
      playerStats.completionTimes.reduce((a, b) => a + b, 0) /
      playerStats.completionTimes.length;
  }
}

//reset the current session stats
function resetCurrentSessionStats() {
  currentSessionsStats.forEach((playerStats) => {
    playerStats.gamesPlayed = 0;
    playerStats.fastestTime = null;
    playerStats.averageTimePerGame = null;
    playerStats.completionTimes = [];
  });
}
resetCurrentSessionStats();

// create a function to save the current session stats to a file
function saveCurrentSessionStats() {
  const data = JSON.stringify(currentSessionsStats, null, 2);
  writeFileSync("records.json", data, "utf8");
  writeFileSync("currentSessionStats.json", data, "utf8");
}
saveCurrentSessionStats();
