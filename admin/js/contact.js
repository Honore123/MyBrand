const baseUrl = "https://real-jade-katydid-fez.cyclic.app/inquiries/";
const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", function () {
  if (!token) {
    window.location.replace("./login.html");
  }
});

// fetch all the visitor's messages
function visitorMessages() {
  const urlMessages = baseUrl;
  fetch(urlMessages, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.data.forEach(function (visitor, index) {
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
                  visitor._id
                }" class="btn-reply">
                  <i class="fas fa-reply-all"></i>
                </a>
                <button class="btn-delete btn-contact" onclick="deleteMessage('${
                  visitor._id
                }')">
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

  const readUrl = baseUrl + messageId;
  fetch(readUrl, { headers: { Authorization: token } })
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.data.forEach(function (visitor) {
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
  const deleteMessageUrl = baseUrl + messageId;

  fetch(deleteMessageUrl, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: token,
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
