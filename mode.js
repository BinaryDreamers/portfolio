document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("mode");

  // Check if dark mode preference is stored in localStorage
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkmode();
  } else {
    lightmode();
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkmode();
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
      darkmode();
    } else {
      localStorage.setItem("dark-mode", "disabled");
      lightmode();
    }
  });
});

const darkmode = () => {
  notification.classList.remove("hidden");
  notification.classList.add("show");
  notification.innerText = "DarkMode is enabled";
  notification.style.backgroundColor = "#000";
  notification.style.color = "#fff";
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 500);
  }, 3000);
};
const lightmode = () => {
  notification.classList.remove("hidden");
  notification.classList.add("show");
  notification.innerText = "lightMode is enabled";
  notification.style.backgroundColor = "#fff";
  notification.style.color = "#000";
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 500);
  }, 3000);
};
