document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".comment-form form")
    const usernameInput = document.getElementById("username")
    const commentInput = document.getElementById("comment")
    const commentsContainer = document.querySelector(".published-comments")

    
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        commentsContainer.innerHTML = ""; 
        comments.forEach(comment => {
            addCommentToPage(comment.name, comment.text);
        });
    }

    function addCommentToPage(name, text) {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item");
        commentItem.innerHTML = `<strong>${name}</strong> <p class="comment-text">${text}</p>`;

        commentItem.addEventListener("mouseenter", () => {
            commentItem.classList.add("hovered");
        });
        commentItem.addEventListener("mouseleave", () => {
            commentItem.classList.remove("hovered");
        });

        commentsContainer.appendChild(commentItem);
    }

    function saveComment(name, text) {
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push({ name, text });
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const commentText = commentInput.value.trim();
        const userName = usernameInput.value.trim(); 

        if (commentText && userName) {
            addCommentToPage(userName, commentText);
            saveComment(userName, commentText);
            commentInput.value = ""; 
            usernameInput.value = ""; 
        }
    });

    loadComments();    
})