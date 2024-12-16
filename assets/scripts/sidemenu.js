// === local storage ===

let playerName = localStorage.getItem('playerName') || 'Player';
let playerScore = localStorage.getItem('playerScore') || 0;
let playerGames = localStorage.getItem('playerGames') || 0;

function updateLocalStorage() {
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('playerGames', playerGames);
}

// === eventlistners ===

document.getElementById('playButton').addEventListener('click', () => {
    console.log('Play button clicked');
    // add the "start playfield" logic here
});

document.getElementById('optionsButton').addEventListener('click', () => {
    console.log('Options button clicked');
    // we can add options menu here / or this can be commented out
});

document.getElementById('restartButton').addEventListener('click', () => {
    console.log('Restart button clicked');
    playerScore = 0;
    playerGames = 0;
    updateLocalStorage();
    // we can add restart logic here
});

document.getElementById('quitButton').addEventListener('click', () => {
    console.log('Quit button clicked');
    // we can add quit logic here
});

// === initialization ===

function initializeSideMenu() {
    document.getElementById('playerName').innerText = playerName;
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('playerGames').innerText = playerGames;
}

window.onload = initializeSideMenu;