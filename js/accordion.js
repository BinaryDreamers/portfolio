document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".accordion-header");
  const contents = document.querySelectorAll(".accordion-content");
  const icons = document.querySelectorAll(".icon-accordion");

  headers.forEach((header, index) => {
    header.addEventListener("click", () => {
      const content = contents[index];
      const icon = icons[index];

      if (content.classList.contains("open")) {
        content.style.maxHeight = null;
        content.classList.remove("open");
        icon.classList.remove("open");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
        icon.classList.add("open");
      }
    });
  });
});
