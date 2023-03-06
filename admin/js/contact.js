document.addEventListener("DOMContentLoaded", function () {
  if (!sessionStorage.getItem("email")) {
    window.location.replace("./login.html");
  }
});

// fetch all the visitor's messages
function visitorMessages() {
  const urlMessages = "http://localhost:3000/messages";
  fetch(urlMessages)
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.forEach(function (visitor, index) {
        output += `
        <tr>
            <td>${index + 1}</td>
            <td>${visitor.visitor_names}</td>
            <td>${visitor.visitor_email}</td>
            <td>
             ${visitor.visitor_message}
            </td>
            <td>
              <div class="container-row">
                <a href="./reply_contact.html?id=${
                  visitor.id
                }" class="btn-reply">
                  <i class="fas fa-reply-all"></i>
                </a>
                <button class="btn-delete btn-contact" onclick="deleteMessage(${
                  visitor.id
                })">
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      });
      document.getElementById("messages-content").innerHTML = output;
    });
}

// view single message
function readMessage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const messageId = urlParams.get("id");

  const readUrl = "http://localhost:3000/messages?id=" + messageId;
  fetch(readUrl)
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.forEach(function (visitor) {
        output += `<div class="d-flex justify-between">
        <span>${visitor.visitor_names}</span>
        <span>19/02/2023</span>
      </div>
      <p class="text-start">
        ${visitor.visitor_message}
      </p>`;
      });
      document.getElementById("read-message-content").innerHTML = output;
    });
}

// delete Message
function deleteMessage(messageId) {
  const deleteMessageUrl = `http://localhost:3000/messages/${messageId}`;

  fetch(deleteMessageUrl, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      Toastify({
        text: "Message deleted successfully",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#00b09b",
        },
      }).showToast();
      visitorMessages();
    });
}
