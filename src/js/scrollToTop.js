import throttle from 'lodash.throttle';
export default window.onscroll = throttle(function () { scrollFunction() }, 400);

// When the user scrolls down 20px from the top of the document, show the button
let mybutton = document.getElementById("scrollBtn");

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
      mybutton.classList.add("showScroll");
  } else {
     mybutton.classList.remove("showScroll");  
  }
}

function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
      
mybutton.addEventListener('click', topFunction);