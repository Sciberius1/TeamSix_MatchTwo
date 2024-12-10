// grid layout
const beginGame = () => {
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');

    for (let i = 0; i < 16; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridContainer.appendChild(gridItem);
    }

    document.body.appendChild(gridContainer);
};

beginGame();

// card population
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = [...cardValues, ...cardValues];
cards.sort(() => 0.5 - Math.random());

const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach((gridItem, index) => {
    gridItem.dataset.value = cards[index];
    gridItem.innerText = cards[index]; // For debugging purposes, remove this line in production
});

// card match
const checkGameOver = () => {
    const matchedCards = document.querySelectorAll('.matched');
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert('Congratulations! You have matched all the cards!');
        }, 500);
    }
};

const checkForMatch = () => {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetCards();
        checkGameOver();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
};
gridItems.forEach((gridItem) => {
    gridItem.addEventListener('click', (event) => {
        if (!event.target.classList.contains('flipped') && !event.target.classList.contains('matched')) {
            flipCard(event);
        }
    });
});

// card mismatch

// game over

