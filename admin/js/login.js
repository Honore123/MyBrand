const loginForm = document.querySelector("#login-form");
const alertClose = document.querySelector("#alert-close");
const alertContainer = document.querySelector("#alert-danger");

alertClose.addEventListener("click", function () {
  alertContainer.classList.add("d-none");
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  alertContainer.classList.remove("d-none");
  if (isValidEmail(email.value)) {
    email.classList.remove("invalid");
    if (isValidPassword(password.value)) {
      alertContainer.classList.add("d-none");
    }
  } else {
    email.classList.add("invalid");
  }
});

function isValidEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPassword(password) {
  return password.length >= 8;
}
