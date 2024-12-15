import backgroundImage from './currentSessionStats';
import { cards } from './game_play';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const header = document.querySelector('header');
    const sideMenu = document.querySelector('.side_menu');
    const recordsTable = document.querySelector('.recordsTable');

    // Create a div to hold the background image
    const backgroundDiv = document.createElement('div');
    backgroundDiv.style.position = 'fixed';
    backgroundDiv.style.top = '0';
    backgroundDiv.style.left = '0';
    backgroundDiv.style.width = '100%';
    backgroundDiv.style.height = '100%';
    backgroundDiv.style.zIndex = '-1';
    backgroundDiv.style.backgroundImage = `url(${backgroundImage})`;
    backgroundDiv.style.backgroundSize = 'cover';
    backgroundDiv.style.backgroundPosition = 'center';
    backgroundDiv.style.backgroundRepeat = 'no-repeat';

    // Append the background div to the body
    body.appendChild(backgroundDiv);
});

function renderPlayingField() {
    // Create a 4x4 grid to hold the cards
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gridContainer.style.gridTemplateRows = 'repeat(4, 1fr)';
    gridContainer.style.gap = '10px';
    gridContainer.style.position = 'relative';
    gridContainer.style.zIndex = '1';
    gridContainer.style.margin = '20px';

    // Append the grid container to the body or a specific section
    document.body.appendChild(gridContainer);

    // Assuming you have an array of card elements from game_play.js
    // Append each card to the grid container
    cards.forEach(card => {
        gridContainer.appendChild(card);
    });
}

renderPlayingField();