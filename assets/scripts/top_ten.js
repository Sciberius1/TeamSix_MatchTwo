const fs = require('fs');

// poll ./assets for file named records.json and read the contents, create the file if it does not exist
const path = './assets/records.json';

function checkAndReadFile() {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify([]));
    }
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}

const records = checkAndReadFile();
console.log(records);

// create a function to write to the records.json file
function writeToFile() {
    fs.writeFileSync(path, JSON.stringify(records));
}

// create a function to add a record to the records.json file, to include user name, fastest time taken to complete the game, average time per game, and number of games played
function addRecord(userName, fastestTime, averageTime, gamesPlayed) {
    const newRecord = {
        userName: userName,
        fastestTime: fastestTime,
        averageTime: averageTime,
        gamesPlayed: gamesPlayed
    };
    records.push(newRecord);
    writeToFile();
}

// create a function to display the records in a table, and have the table sortable by user name, fastest time, average time, and games played
function displayRecords() {
    const table = document.createElement('table');
    const headers = ['User Name', 'Fastest Time', 'Average Time', 'Games Played'];
    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.addEventListener('click', () => sortTable(header));
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    records.forEach(record => {
        const row = document.createElement('tr');
        Object.values(record).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    document.body.appendChild(table);
}

function sortTable(header) {
    const headerIndex = {
        'User Name': 'userName',
        'Fastest Time': 'fastestTime',
        'Average Time': 'averageTime',
        'Games Played': 'gamesPlayed'
    }[header];

    records.sort((a, b) => {
        if (a[headerIndex] < b[headerIndex]) return -1;
        if (a[headerIndex] > b[headerIndex]) return 1;
        return 0;
    });

    document.querySelector('table').remove();
    displayRecords();
}

displayRecords();
// create a button to begin a new game and add an event listener to the button to start the game
const newGameButton = document.getElementById('new-game-button');
newGameButton.addEventListener('click', () => {
    const gamePlayScript = document.createElement('script');
    gamePlayScript.src = '/scripts/game_play.js';
    document.body.appendChild(gamePlayScript);
    console.log('New game started');
});

//  create a button to run the code for the options menu located in the options_menu.js file and add an event listener to the button to view the options menu
const optionsMenuButton = document.getElementById('options-menu-button');
optionsMenuButton.addEventListener('click', () => {
    const optionsMenuScript = document.createElement('script');
    optionsMenuScript.src = '/scripts/options_menu.js';
    document.body.appendChild(optionsMenuScript);
    console.log('Options menu opened');
});
