let slides =document.querySelectorAll('.home .slide');
let index = 0 ;
 
function next(){
    slides[index].classList.remove('active');
    index = (index + 1 ) % slides.length;
     slides[index].classList.add('active');

}
function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
     slides[index].classList.add('active');

}

let currentSlide = 0;
const slide = document.querySelectorAll(".home .slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function next() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prev() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto slide every 3 seconds
setInterval(next, 3000);

// Initialize first slide
showSlide(currentSlide);