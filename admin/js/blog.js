document.addEventListener("DOMContentLoaded", function () {
  if (!sessionStorage.getItem("email")) {
    window.location.replace("./login.html");
  }
});
// Quill configuration
var quill = new Quill("#editor", {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
  },
  theme: "snow",
});

// Blog submission
const blogForm = document.querySelector("#blog-form");

blogForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const thumbnail = document
    .querySelector("#preview-thumbnail")
    .getAttribute("src");
  const image = document.querySelector("#thumbnail");
  const title = document.querySelector("#title");
  const content = quill.getText();

  if (!validateImage(image)) {
    Toastify({
      text: "Image type not supported",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#c20000",
      },
    }).showToast();
  } else if (!validateContent(title.value)) {
    Toastify({
      text: "Fill title input :(",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#c20000",
      },
    }).showToast();
  } else if (!validateContent(content)) {
    Toastify({
      text: "Fill content area :(",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#c20000",
      },
    }).showToast();
  } else {
    const addBlogUrl = "http://localhost:3000/blog";
    const titleVal = title.value;
    fetch(addBlogUrl, {
      method: "POST",
      body: JSON.stringify({ title: titleVal, content: content, thumbnail }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.id) {
          Toastify({
            text: "Blog published successfully",
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
          setTimeout(() => {
            window.location.replace("./blog.html");
          }, 1000);
        } else {
          Toastify({
            text: "Error occured while publishing :(",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "#c20000",
            },
          }).showToast();
        }
      });
  }
});

function validateImage(image) {
  const file = image.files[0];
  const types = ["image/jpeg", "image/png"];

  if (!file || !types.includes(file.type)) {
    return false;
  }

  return true;
}

function validateContent(content) {
  return content.length >= 8;
}

function blogPage() {
  const urlHome = "http://localhost:3000/blog";
  fetch(urlHome)
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.forEach(function (blog) {
        output += `<div class="col mb-20">
        <img src="${blog.thumbnail}" alt="" />
        <h4 class="blog-title">
          ${blog.title}
        </h4>
        <p>
          ${blog.content}
        </p>

        <div class="container-row flex-row">
          <a href="#" class="read-more"
            >Read More <i class="fas fa-long-arrow-alt-right"></i
          ></a>
          <div>
            <a href="./edit_blog.html?title=${blog.title}" class="btn-edit"><i class="far fa-edit"></i></a>
            <button id="delete-btn" class="btn-delete" onClick="deleteBlog('${blog.id}')"><i class="far fa-trash-alt"></i></button>
          </div>
        </div>
      </div>`;
      });
      document.getElementById("blog-content").innerHTML = output;
    });
}

// Edit Blog

function editBlog() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const title = urlParams.get("title");
  const editTitle = document.querySelector("#title");
  const editPreview = document.querySelector("#preview-thumbnail");
  const blogId = document.querySelector("#blog-id");

  const readUrl = "http://localhost:3000/blog?title=" + title;
  fetch(readUrl)
    .then((res) => res.json())
    .then((response) => {
      editTitle.value = response[0].title;
      editPreview.setAttribute("src", response[0].thumbnail);
      blogId.value = response[0].id;
      quill.setText(response[0].content);
    });
}

// Blog Update
const editBlogForm = document.querySelector("#edit-blog-button");

function updateBlog() {
  const thumbnail = document
    .querySelector("#preview-thumbnail")
    .getAttribute("src");
  const image = document.querySelector("#thumbnail");
  const title = document.querySelector("#title");
  const blogId = document.querySelector("#blog-id").value;
  const content = quill.getText();

  if (!validateImage(image)) {
    Toastify({
      text: "Image type not supported",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#c20000",
      },
    }).showToast();
  } else if (!validateContent(title.value)) {
    Toastify({
      text: "Fill title input :(",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#c20000",
      },
    }).showToast();
  } else if (!validateContent(content)) {
    Toastify({
      text: "Fill content area :(",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#c20000",
      },
    }).showToast();
  } else {
    const addBlogUrl = `http://localhost:3000/blog/${blogId}`;
    const titleVal = title.value;
    fetch(addBlogUrl, {
      method: "PUT",
      body: JSON.stringify({ title: titleVal, content: content, thumbnail }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.id) {
          Toastify({
            text: "Blog updated successfully",
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
          setTimeout(() => {
            window.location.replace("./blog.html");
          }, 1000);
        } else {
          Toastify({
            text: "Error occured while updating :(",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "#c20000",
            },
          }).showToast();
        }
      });
  }
}

// delete blog
function deleteBlog(blogId) {
  const addBlogUrl = `http://localhost:3000/blog/${blogId}`;

  fetch(addBlogUrl, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      Toastify({
        text: "Blog deleted successfully",
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
      blogPage();
    });
}

function previewFile() {
  const preview = document.querySelector("#preview-thumbnail");
  const file = document.querySelector("#thumbnail").files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false
  );
  if (file) {
    reader.readAsDataURL(file);
  }
}
