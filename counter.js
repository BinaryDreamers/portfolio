function increaseNumberAnimation(elementId, endNumber, speed) {
  const element = document.getElementById(elementId);

  if (!element) return;

  const animationRunning = JSON.parse(
    element.dataset.animationRunning ?? false
  );

  if (animationRunning) return;

  element.dataset.animationRunning = true;

  incNbrRec(0, endNumber, element, speed);
}

function incNbrRec(currentNumber, endNumber, element, speed) {
  if (currentNumber <= endNumber) {
    element.innerHTML = currentNumber + `+`;
    setTimeout(function () {
      incNbrRec(currentNumber + 1, endNumber, element, speed);
    }, speed);
  } else {
    element.dataset.animationRunning = false;
  }
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      increaseNumberAnimation("nbr", 9, 300);
      increaseNumberAnimation("leetCode-nbr", 40, 100);
      increaseNumberAnimation("meetUp-nbr", 20, 200);
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: "0px",
  threshold: 1,
});

const target = document.querySelector("#leetCode-nbr");
observer.observe(target);
