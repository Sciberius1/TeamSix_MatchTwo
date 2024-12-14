import { displayRecords } from './top_ten.js';
import { startGame, endGame } from './game_play.js';
import records from './records.json';

const backgroundImage = records.backgroundImage || '../images/BLACKOUT.png';

document.body.style.backgroundImage = `url(${backgroundImage})`;
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundRepeat = 'no-repeat';

function createTable() {
    const table = document.createElement('table');
    table.id = 'recordsTable';
    document.body.appendChild(table);
    displayRecords(table);
}

function removeTable() {
    const table = document.getElementById('recordsTable');
    if (table) {
        table.remove();
    }
}

function checkForNewRecords() {
    // Logic to check for new records and update the table
    removeTable();
    createTable();
}

createTable();

startGame(() => {
    removeTable();
});

endGame(() => {
    checkForNewRecords();
});