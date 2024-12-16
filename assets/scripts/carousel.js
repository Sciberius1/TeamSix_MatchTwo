function createCarousel(carouselId) {
    let currentSlide = 0;
    const slides = document.querySelectorAll(`#${carouselId} .carousel-inner img`);

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function prevSlide() {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    }

    function nextSlide() {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);

    // Move through the slides in the carousel
    document.querySelector(`#${carouselId} .prev`).addEventListener('click', prevSlide);
    document.querySelector(`#${carouselId} .next`).addEventListener('click', nextSlide);

}

// Initialize carousels for each ID
createCarousel('artwork');
createCarousel('awards');
createCarousel('creative-writing');
