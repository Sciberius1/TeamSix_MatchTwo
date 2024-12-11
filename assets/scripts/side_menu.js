const scores = require("./records.json")

function side_menu() {
    // Create links for the side menu
    const menu = document.createElement('div');
    menu.id = 'side-menu';

    const playerNameLink = document.createElement('a');
    playerNameLink.href = '#';
    playerNameLink.innerText = 'Player Name';
    playerNameLink.onclick = player_name;

    const bestTimeLink = document.createElement('a');
    bestTimeLink.href = '#';
    bestTimeLink.innerText = 'Best Time';
    bestTimeLink.onclick = best_time;

    const gamesPlayedLink = document.createElement('a');
    gamesPlayedLink.href = '#';
    gamesPlayedLink.innerText = 'Games Played';
    gamesPlayedLink.onclick = games_played;

    const optionsMenuLink = document.createElement('a');
    optionsMenuLink.href = '#';
    optionsMenuLink.innerText = 'Options Menu';
    optionsMenuLink.onclick = options_menu;

    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart';
    restartButton.onclick = restart;

    const quitButton = document.createElement('button');
    quitButton.innerText = 'Quit';
    quitButton.onclick = quit;

    menu.appendChild(playerNameLink);
    menu.appendChild(bestTimeLink);
    menu.appendChild(gamesPlayedLink);
    menu.appendChild(optionsMenuLink);
    menu.appendChild(restartButton);
    menu.appendChild(quitButton);

    document.body.appendChild(menu);
}

function player_name() {
    // Display player name
    alert('Player Name: ' + localStorage.getItem('playerName'));
}

function best_time() {
    // Display current best time
    alert('Best Time: ' + localStorage.getItem('bestTime'));
}

function games_played() {
    // Display current number of games played
    alert('Games Played: ' + localStorage.getItem('gamesPlayed'));
}

function options_menu() {
    // Allow user to change game options
    alert('Options Menu');
}

function restart() {
    // Reset current stats
    localStorage.setItem('bestTime', '0');
    localStorage.setItem('gamesPlayed', '0');
    alert('Stats have been reset');
}

function quit() {
    // Exit the game and store data to records.json
    const playerName = localStorage.getItem('playerName');
    const bestTime = localStorage.getItem('bestTime');
    const gamesPlayed = localStorage.getItem('gamesPlayed');
    const averageTime = localStorage.getItem('averageTime');

    const data = {
        playerName,
        bestTime,
        averageTime,
        gamesPlayed
    };

    fetch('records.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        alert('Game data saved. Exiting game...');
        window.close();
    });
}

