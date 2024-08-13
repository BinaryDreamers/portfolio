let isValid = true;

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  document.getElementById("firstnameError").textContent = "";
  document.getElementById("lastnameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("messageError").textContent = "";

  const firstname = document.querySelector("#firstname").value.trim();
  const lastname = document.querySelector("#lastname").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();


  if (!firstname) {
    document.getElementById("firstnameError").textContent =
      "Firstname is required.";
    isValid = false;
  }

  if (!lastname) {
    document.getElementById("lastnameError").textContent =
      "Lastname is required.";
    isValid = false;
  }

  if (!email) {
    document.getElementById("emailError").textContent = "Email is required.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById("emailError").textContent = "Email is invalid.";
    isValid = false;
  }

  if (!message) {
    document.getElementById("messageError").textContent =
      "Message is required.";
    isValid = false;
  }

  if (isValid) {
    setTimeout(() => {
      document.getElementById("popupOverlay").style.display = "block";
      document.getElementById("popupWindow").style.display = "block";
      document.getElementById("myForm").reset();
      const duration = 15 * 1000,
        animationEnd = Date.now() + duration;

      let skew = 1;

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      (function frame() {
        const timeLeft = animationEnd - Date.now(),
          ticks = Math.max(200, 500 * (timeLeft / duration));

        skew = Math.max(0.8, skew - 0.001);

        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: ticks,
          origin: {
            x: Math.random(),
            // since particles fall down, skew start toward the top
            y: Math.random() * skew - 0.2,
          },
          colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
          shapes: ["circle"],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.4, 1),
          drift: randomInRange(-0.4, 0.4),
        });

        if (timeLeft > 0) {
          requestAnimationFrame(frame);
        }
      })();

    }, 1000);
  }

  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popupOverlay").style.display = "none";
    document.getElementById("popupWindow").style.display = "none";
  });
});

function submitForm() {
  if(isValid){
    const form = document.getElementById("myForm")
    const subject = document.getElementById("form-subject")
    subject.value = `New Submission Binary Dreamers, ${document.getElementById("firstname").value} ${document.getElementById("lastname").value}`
    const formData = new FormData(form)
    const url = 'https://api.web3forms.com/submit'
    fetch(
      url,
      {
        method: 'POST',
        body: formData
      }
    )
  }
  return false
}