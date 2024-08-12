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

  let isValid = true;

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
    }, 1000);
  }

  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popupOverlay").style.display = "none";
    document.getElementById("popupWindow").style.display = "none";
  });
});

function submitForm() {
        
  const form = document.getElementById("myForm")
  const formData = new FormData(form)
  const url = 'https://formsubmit.co/eyosiyashabtemariam@gmail.com'
  fetch(
    url,
    {
      method: 'POST',
      body: formData
    }
  )
  return false
}