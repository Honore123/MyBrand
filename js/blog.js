const likeBtn = document.querySelector("#like-btn");
function blogHome() {
  const urlHome = "http://localhost:3000/blog?_limit=3";
  fetch(urlHome)
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.forEach(function (blog) {
        output += `<div class="col-30 mb-sm-60">
          <img class="img-fluid" src="${blog.thumbnail}" alt="" />
          <h4 class="blog-title">
           ${blog.title}
          </h4>
          <p class="text-justify">
           ${blog.content}
          </p>
    
          <a href="./read_blog.html?title=${blog.title}" class="read-more"
            >Read More <i class="fas fa-long-arrow-alt-right"></i
          ></a>
        </div>`;
      });
      document.getElementById("blog-content").innerHTML = output;
    });
}

function blogPage() {
  const urlHome = "https://real-jade-katydid-fez.cyclic.app/blogs";
  fetch(urlHome)
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.data.forEach(function (blog) {
        output += `<div class="col-30 mb-sm-60 mb-50">
            <img class="img-fluid" src="${blog.thumbnail}" alt="" />
            <h4 class="blog-title">
             ${blog.title}
            </h4>
            <p class="text-justify">
             ${blog.content}
            </p>
      
            <a href="./read_blog.html?id=${blog._id}" class="read-more"
              >Read More <i class="fas fa-long-arrow-alt-right"></i
            ></a>
          </div>`;
      });
      document.getElementById("blog-content").innerHTML = output;
    });
}

function readBlog() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const readUrl = "https://real-jade-katydid-fez.cyclic.app/blogs/" + id;
  fetch(readUrl)
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.data.forEach(function (blog) {
        output += `<img class="img-fluid" src="${blog.thumbnail}" alt="${blog.title}" />
        <p class="mt-4 text-justify">
         ${blog.content}
        </p>`;
      });
      document.getElementById("blog-content").innerHTML = output;
      const blogId = document.querySelector("#blog-id");

      const { _id, title } = response.data[0];
      blogId.value = _id;
      fetchComments(_id);
      likeBtn.setAttribute("onclick", "likeBlog()");
    });
}

// fetch comments
function fetchComments(blogId) {
  const commentsUrl = `https://real-jade-katydid-fez.cyclic.app/blogs/${blogId}/comments`;
  fetch(commentsUrl)
    .then((res) => res.json())
    .then((response) => {
      let output = "";
      response.data.forEach(function (comment) {
        output += ` <div class="border-bottom-default">
        <h5>${comment.names}</h5>
        <p class="fs-14">${comment.comment}</p>
      </div>`;
      });
      document.getElementById("comment-content").innerHTML = output;
    });
}

// add comment
const commentForm = document.querySelector("#comment-form");

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const names = document.querySelector("#names");
  const blogId = document.querySelector("#blog-id");
  const comment = document.querySelector("#comment");

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
  } else if (!validateContent(comment.value)) {
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
  } else {
    const addCommentUrl = `https://real-jade-katydid-fez.cyclic.app/blogs/${blogId.value}/comments`;

    fetch(addCommentUrl, {
      method: "POST",
      body: JSON.stringify({
        names: names.value,
        comment: comment.value,
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
            text: "Comment added successfully",
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
            fetchComments(blogId.value);
            comment.value = "Leave a Comment";
            names.value = "";
          }, 1000);
        } else {
          Toastify({
            text: "Error occured while adding comment :(",
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

// Like blog

function likeBlog() {
  const blogId = document.querySelector("#blog-id");

  const likeBlogUrl = `https://real-jade-katydid-fez.cyclic.app/blogs/${blogId.value}/likes`;
  fetch(likeBlogUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.status == 200) {
        Toastify({
          text: "You liked this blog!",
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
        likeBtn.classList.remove("far", "fa-thumbs-up");
        likeBtn.classList.add("fas", "fa-thumbs-up");
        likeBtn.removeAttribute("onclick");
      } else {
        Toastify({
          text: "Error occured while liking the blog :(",
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
