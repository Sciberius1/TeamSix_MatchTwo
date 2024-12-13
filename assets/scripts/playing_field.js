let backgroundChoice = localStorage.getItem('backgroundChoice');
// If the user has not selected a background, set the background choice to #000000
if (!backgroundChoice) {
    backgroundChoice = '#000000';
}

//setting up the images directory and filtering the images to only include .jpg, .jpeg, .png, and .gif files and storing them in the images array
const fs = require('fs');
const path = require('path');
const imagesDir = path.join(__dirname, '../images');
const images = fs.readdirSync(imagesDir).filter(file => {
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
}).map(file => path.join(imagesDir, file));
//     if options_menu.js is used, call the function to select a background image
//     if options_menu.js is not used, set the background color to black
if (typeof options_menu !== 'undefined') {
    selectBackgroundImage();
} else {
    document.body.style.backgroundColor = '#000000';
}
// Check if options_menu.js is used
if (typeof options_menu !== 'undefined') {
    // Call the function to select a background image
    selectBackgroundImage();
} else {
    // Set the background color to black if options_menu.js is not used
    document.body.style.backgroundColor = '#000000';
}
// if options_menu.js is not used, use #000000 as the background color
function selectBackgroundImage() {
    const userChoice = localStorage.getItem('backgroundChoice');
   
    //     if the user has not selected a background, offer to have the user use a black background or use a random image from the images array
    if (!userChoice) {
        const useBlack = confirm("Do you want to use a black background?");
        if (useBlack) {
            document.body.style.backgroundColor = '#000000';
            localStorage.setItem('backgroundChoice', 'black');
        } else {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            document.body.style.backgroundImage = `url(${randomImage})`;
            localStorage.setItem('backgroundChoice', 'random');
        }
    } else if (userChoice === 'black') {
        document.body.style.backgroundColor = '#000000';
    } else if (userChoice === 'random') {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        document.body.style.backgroundImage = `url(${randomImage})`;
    }
}