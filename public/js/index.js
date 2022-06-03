const logInBtn = document.getElementById('LogInBtn');
const RegisterBtn = document.getElementById('RegisterBtn');


// console.log(logInBtn);
logInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('click received');
    fetch(`/loginbuffer`)
        .then((response) => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        })
})

RegisterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('click received');
    fetch(`/registerbuffer`)
        .then((response) => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        })
})



// Sliding Images
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
