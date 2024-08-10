window.addEventListener("scroll", () => {
  const navBar = document.querySelector(".nav-bar");
  const navLinks = document.querySelector(".nav-links");

  const logo = document.querySelector(".logo");
  navBar.classList.toggle("stick", window.scrollY > 0);
  navLinks.classList.toggle("small-nav-link", window.scrollY > 0);
  logo.classList.toggle("logo-small", window.scrollY > 0);
});

window.addEventListener("load", () => {
  const containerDiv = document.querySelector(".links");
  const links = containerDiv.querySelectorAll("a");

  links.forEach((link) => {
    link.style.color = "white";
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      links.forEach((link) => {
        link.style.color = "black";
      });
    } else {
      links.forEach((link) => {
        link.style.color = "white";
      });
    }
  });
});
