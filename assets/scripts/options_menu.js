import { readdir } from 'fs/promises';
import { join } from 'path';
import { resetCurrentSessionStats } from './game_play.js';
import { getCurrentSessionStats, updateCurrentSessionStats } from './game_play.js';
import { writeFile } from 'fs/promises';

let playerName = 'Player 1';    

// create a function to read the contents of the ./assets/images directory and return an array of file names ending in .png and .jpg
async function getImages() {
    const directoryPath = join(__dirname, '../images');
    const files = await readdir(directoryPath);
    return files.filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
}

export { getImages };
//create a function to display playerName from the currentSessionStats
function displayPlayerName() {
    const currentSessionStats = getCurrentSessionStats();
    const playerName = document.getElementById('player-name');
    playerName.value = currentSessionStats.playerName;
}

