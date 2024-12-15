
// create variables to store the playerName, backgroundImage, cardBackImage, fastestTime, averageTime, gamesPlayed, and completionTimes
let playerName;
let backgroundImage;
let cardBackImage;
let fastestTime;
let averageTime;
let gamesPlayed;
let completionTimes = [];

// create a funtion to import the current session stats from the currentSessionStats.json file
async function importSessionStats() {
    try {
        const response = await fetch('./assets/data/currentSessionStats.json');
        const data = await response.json();
        playerName = data.playerName;
        backgroundImage = data.backgroundImage;
        cardBackImage = data.cardBackImage;
        fastestTime = data.fastestTime;
        averageTime = data.averageTime;
        gamesPlayed = data.gamesPlayed;
        completionTimes = data.completionTimes;
    } catch (error) {
        console.error('Error importing session stats: ', error);
    }
}

// create a function to check the current playerName and make it the default value if it is null, use current value if it is not empty
function checkPlayerName(defaultName) {
    if (!playerName) {
        playerName = "Player 1";
    }
}

// create a function to display the current player name in ./assets/scripts/options_menu.html
function displayPlayerName() {
    const playerNameElement = document.getElementById('playerNameDisplay');
    if (playerNameElement) {
        playerNameElement.textContent = playerName;
    } else {
    }
}
displayPlayerName();

//create a function to update the player name, save it to the currentSessionStats.json file and display it
function changePlayerName() {
    const newPlayerName = prompt('Enter new username:');
    if (newPlayerName) {
        playerName = newPlayerName;
        displayPlayerName();
        saveSessionStats();
    }
}

async function saveSessionStats() {
    const sessionStats = {
        playerName,
        backgroundImage,
        cardBackImage,
        fastestTime,
        averageTime,
        gamesPlayed,
        completionTimes
    };

    try {
        const response = await fetch('./scripts/currentSessionStats.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sessionStats)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error saving session stats:', error);
    }
}


// Call the function to add the event listener
changePlayerName();