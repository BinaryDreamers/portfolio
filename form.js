document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Clear previous errors
  document.getElementById("firstnameError").textContent = "";
  document.getElementById("lastnameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("messageError").textContent = "";

  // Get form values
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Initialize a flag for form validation
  let isValid = true;

  // Validate firstname
  if (!firstname) {
    document.getElementById("firstnameError").textContent =
      "Firstname is required.";
    isValid = false;
  }

  // Validate lastname
  if (!lastname) {
    document.getElementById("lastnameError").textContent =
      "Lastname is required.";
    isValid = false;
  }

  // Validate email
  if (!email) {
    document.getElementById("emailError").textContent = "Email is required.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById("emailError").textContent = "Email is invalid.";
    isValid = false;
  }

  // Validate message
  if (!message) {
    document.getElementById("messageError").textContent =
      "Message is required.";
    isValid = false;
  }

  // If form is valid, you can proceed with form submission or any other logic
  if (isValid) {
    setTimeout(() => {
      document.getElementById("popupOverlay").style.display = "block";
      document.getElementById("popupWindow").style.display = "block";
    }, 1000);

    // You can add code here to submit the form via AJAX or any other method
  }

  document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popupOverlay").style.display = "none";
    document.getElementById("popupWindow").style.display = "none";
  });
});
