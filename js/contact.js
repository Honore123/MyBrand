// contact message submission
const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const names = document.querySelector("#names");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");

  if (!validateContent(names.value)) {
    Toastify({
      text: "Fill your Names :(",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#c20000",
      },
    }).showToast();
  } else if (!validateContent(message.value)) {
    Toastify({
      text: "Fill message with more than 8 characters :(",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#c20000",
      },
    }).showToast();
  } else if (!isValidEmail(email.value)) {
    Toastify({
      text: "Fill your email correctly :(",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#c20000",
      },
    }).showToast();
  } else {
    const addMessageUrl = "https://real-jade-katydid-fez.cyclic.app/inquiries";

    fetch(addMessageUrl, {
      method: "POST",
      body: JSON.stringify({
        visitor_names: names.value,
        visitor_email: email.value,
        visitor_message: message.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status == 200) {
          Toastify({
            text: "Message sent successfully",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#00b09b",
            },
          }).showToast();
          setTimeout(() => {
            window.location.replace("./index.html");
          }, 1000);
        } else {
          Toastify({
            text: "Error occured while sending message :(",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#c20000",
            },
          }).showToast();
        }
      });
  }
});

function validateContent(content) {
  return content.length >= 8;
}
function isValidEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
