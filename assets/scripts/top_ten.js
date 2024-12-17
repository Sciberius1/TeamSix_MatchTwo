//create a function to retrieve the records from the server and display the top ten records in the table according to the chosen requirements 
async function fetchRecords() {
    try {
        const response = await fetch('/path/to/records.json');
        const data = await response.json();
        document.body.style.backgroundImage = `url(${data.backgroundImage})`;
        displayRecords(data.records);
    } catch (error) {
        console.error('Error fetching records:', error);
    }
}

// display ststs of the current session in a row above the top ten records table
function displayCurrentSessionStats(stats) {
    const table = document.getElementById('recordsTable');
    const row = table.insertRow(0);
    row.insertCell(0).innerText = stats.playerName;
    row.insertCell(1).innerText = stats.gamesPlayed;
    row.insertCell(2).innerText = stats.fastestTime;
    row.insertCell(3).innerText = stats.averageTime;
    const headerRow = table.insertRow(0);
    headerRow.insertCell(0).innerText = 'Player Name';
    headerRow.insertCell(1).innerText = 'Games Played';
    headerRow.insertCell(2).innerText = 'Fastest Time';
    headerRow.insertCell(3).innerText = 'Average Time';
}


// Example usage
const currentSessionStats = {
    playerName: 'Current Player',
    gamesPlayed: 5,
    fastestTime: 120,
    averageTime: 150
};

displayCurrentSessionStats(currentSessionStats);

function displayRecords(records) {
    const table = document.getElementById('recordsTable');
    const sortedRecords = records.sort((a, b) => a.fastestTime - b.fastestTime).slice(0, 10);
    sortedRecords.forEach(record => {
        const row = table.insertRow();
        row.insertCell(0).innerText = record.playerName;
        row.insertCell(1).innerText = record.gamesPlayed;
        row.insertCell(2).innerText = record.fastestTime;
        row.insertCell(3).innerText = record.averageTime;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchRecords();
    const headers = document.querySelectorAll('#recordsTable th');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.cellIndex;
            const order = header.dataset.order = -(header.dataset.order || -1);
            const rows = Array.from(document.querySelectorAll('#recordsTable tr:nth-child(n+2)'));
            rows.sort((a, b) => order * (a.cells[column].innerText.localeCompare(b.cells[column].innerText, undefined, {numeric: true})));
            rows.forEach(row => table.appendChild(row));
        });
    });
});

// Add table headers with click event listeners for sorting
function addTableHeaders() {
    const table = document.getElementById('recordsTable');
    const headerRow = table.insertRow(0);
    const headers = ['Player Name', 'Games Played', 'Fastest Time', 'Average Time'];
    headers.forEach((headerText, index) => {
        const headerCell = document.createElement('th');
        headerCell.innerText = headerText;
        headerCell.dataset.order = -1;
        headerCell.addEventListener('click', () => {
            const order = headerCell.dataset.order = -(headerCell.dataset.order || -1);
            const rows = Array.from(document.querySelectorAll('#recordsTable tr:nth-child(n+2)'));
            rows.sort((a, b) => {
                const aText = a.cells[index].innerText;
                const bText = b.cells[index].innerText;
                return order * (aText.localeCompare(bText, undefined, { numeric: true }));
            });
            rows.forEach(row => table.appendChild(row));
        });
        headerRow.appendChild(headerCell);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchRecords();
    addTableHeaders();
});

