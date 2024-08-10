window.addEventListener("load", () => {
  const paths = document.querySelectorAll(".curvy-path path");

  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Animate the path when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const svg = entry.target;
          svg.classList.add("visible");
          setTimeout(() => {
            path.style.transition = "stroke-dashoffset 2s ease";
            path.style.strokeDashoffset = "0";
          }, 100);
        }
      });
    });

    observer.observe(path.parentElement);
  });
  // script.js

  // Make circles follow the cursor
});
