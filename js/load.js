window.addEventListener("load", function () {
  const minDisplayTime = 3000;
  const startTime = new Date().getTime();

  function hideLoader() {
    document.body.classList.add("loaded");
  }

  const elapsedTime = new Date().getTime() - startTime;
  const remainingTime = minDisplayTime - elapsedTime;

  setTimeout(hideLoader, remainingTime > 0 ? remainingTime : 0);
});
