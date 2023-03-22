const baseUrl = "https://real-jade-katydid-fez.cyclic.app/blogs/";
const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", function () {
  if (!token) {
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
    const addBlogUrl = baseUrl;
    const titleVal = title.value;
    let data = new FormData();
    data.append("thumbnail", image.files[0]);
    data.append(
      "blog",
      JSON.stringify({
        title: titleVal,
        content: content,
        thumbnail: image.files[0].name,
        likes: 0,
      })
    );

    fetch(addBlogUrl, {
      method: "POST",
      body: data,
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status == 200) {
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
            text: response.message,
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
  const urlHome = baseUrl;
  fetch(urlHome)
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.data.forEach(function (blog) {
        output += `<div class="col mb-20">
        <img src="${blog.thumbnail}" alt="" />
        <h4 class="blog-title">
          ${blog.title.substr(0, 58)}
        </h4>
        <p>
          ${blog.content.substr(0, 143)}
        </p>

        <div class="container-row flex-row">
          <a href="#" class="read-more"
            >Read More <i class="fas fa-long-arrow-alt-right"></i
          ></a>
          <div>
            <a href="./edit_blog.html?id=${
              blog._id
            }" class="btn-edit"><i class="far fa-edit"></i></a>
            <button id="delete-btn" class="btn-delete" onClick="deleteBlog('${
              blog._id
            }')"><i class="far fa-trash-alt"></i></button>
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
  const id = urlParams.get("id");
  const editTitle = document.querySelector("#title");
  const editPreview = document.querySelector("#preview-thumbnail");
  const blogId = document.querySelector("#blog-id");

  const readUrl = baseUrl + id;
  fetch(readUrl)
    .then((res) => res.json())
    .then((response) => {
      editTitle.value = response.data[0].title;
      editPreview.setAttribute("src", response.data[0].thumbnail);
      blogId.value = response.data[0]._id;
      quill.setText(response.data[0].content);
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

  if (!validateImage(image) && image.files[0]) {
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
    const titleVal = title.value;
    if (image.files[0]) {
      let data = new FormData();
      data.append("thumbnail", image.files[0]);
      data.append(
        "blog",
        JSON.stringify({
          title: titleVal,
          content: content,
          thumbnail: image.files[0].name,
        })
      );
      const updateImageBlogUrl = baseUrl + "update/image/" + blogId;
      fetch(updateImageBlogUrl, {
        method: "PUT",
        body: data,
        headers: {
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status == 200) {
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
              text: response.message,
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
    } else {
      const addBlogUrl = baseUrl + blogId;
      fetch(addBlogUrl, {
        method: "PUT",
        body: JSON.stringify({
          title: titleVal,
          content: content,
          thumbnail,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status == 200) {
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
}

// delete blog
function deleteBlog(blogId) {
  const addBlogUrl = baseUrl + blogId;

  fetch(addBlogUrl, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.status == 200) {
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
      } else {
        Toastify({
          text: response.message,
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
