const elements = document.querySelectorAll(".section-four .content");

elements.forEach((element, index) => {
  if (index % 2 == 0) {
    element.style.position = "relative";
    element.style.left = "-800px";
  } else {
    element.style.position = "relative";
    element.style.right = "-800px";
  }
});
