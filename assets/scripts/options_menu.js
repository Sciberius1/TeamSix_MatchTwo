import { readdir } from 'fs/promises';
import { join } from 'path';
import { getCurrentSessionStats} from './game_play.js';
import { writeFile } from 'fs/promises';

default card back image

// create a function to read the contents of the ./assets/images directory and return an array of file names ending in .png and .jpg
async function getImages() {
    const directoryPath = join(__dirname, '../images');
    const files = await readdir(directoryPath);
    return files.filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
}

export { getImages };

// create a function to display playerName from the currentSessionStats on linked html page options_menu.html
async function displayPlayerName() {
    const stats = await getCurrentSessionStats();
    const playerName = stats.playerName;
    document.getElementById('playerName').textContent = playerName;
}

document.addEventListener('DOMContentLoaded', displayPlayerName);
