document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("mode");

  // Check if dark mode preference is stored in localStorage
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save the preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }
  });
});
