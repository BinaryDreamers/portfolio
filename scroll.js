// script.js
document.querySelectorAll(".scrollButton").forEach((button) => {
  button.addEventListener("click", function () {
    const targetSelector = this.getAttribute("data-target");
    const targetElement = document.querySelector(targetSelector);
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; // Duration in milliseconds
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ease = easeInOutCubic(progress / duration);
      window.scrollTo(0, startPosition + distance * ease);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    // Easing function for smooth animation
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".backToTop");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", function () {
    const duration = 1000;
    const startPosition = window.pageYOffset;
    const distance = -startPosition;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const ease = easeInOutCubic(progress / duration);
      window.scrollTo(0, startPosition + distance * ease);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    // Easing function for smooth animation
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  });
});
