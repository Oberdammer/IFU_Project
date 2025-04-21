document.querySelector('.back').addEventListener('click', function() {
    window.location.href = 'index.html';
  });
  
  const slides = document.querySelector('.slides');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;
  const totalSlides = dots.length;
  
  function updateSlider(index) {
    // Calculate the exact percentage to move based on the selected slide
    slides.style.transform = `translateX(-${index * 33.333}%)`;
  
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider(currentIndex);
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider(currentIndex);
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider(currentIndex);
    });
  });