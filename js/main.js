// Menu Bar CSS
const menuBtn = document.querySelector(".btn-menu");
const navbar = document.querySelector(".navbar");
menuBtn.addEventListener("click", function () {
  if (navbar.classList.contains("d-none")) {
    navbar.classList.remove("d-none");
  } else {
    navbar.classList.add("d-none");
  }
});

//onScroll Navbar Shadow
const nav = document.querySelector("nav");
const NavOffsetY = nav.offsetTop;
window.addEventListener("scroll", function () {
  if (this.pageYOffset > NavOffsetY) {
    nav.classList.add("shadow");
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("shadow");
    nav.classList.remove("sticky");
  }
});

// set navigation link to active when click

var links = navbar.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (event) {
    for (var j = 0; j < links.length; j++) {
      links[j].classList.remove("active");
    }
    event.target.classList.add("active");
  });
}
