// Simple Blog Post and show comments:

let hash = window.location.hash
let postUrl = "http://localhost:3000/posts/";
let commentUrl = "http://localhost:3000/comments?postId=";

postUrl += hash.replace('#', '');
commentUrl += hash.replace('#', '');
const body = document.querySelector("body");


fetch(postUrl)
    .then(response => response.json())
    .then(data => {
        const postHeader = document.createElement("div")
        const postTitle = document.createElement("h1")
        const postAuthor = document.createElement("h3")
        const postBody = document.createElement("p")

        postHeader.className = "header"
        postTitle.className = "header-item"
        postAuthor.className = "header-item"
        postBody.className = "post-body"

        postTitle.innerHTML = data.title
        postAuthor.innerHTML = "Author: " + data.userId
        postBody.innerHTML = data.body

        postHeader.appendChild(postTitle)
        postHeader.appendChild(postAuthor)
        body.appendChild(postHeader)
        body.appendChild(postBody)

        return fetch(commentUrl);

    })
    .then(response => response.json())
    .then(data2 => {

        const commentsBox = document.createElement("ol")
        const commentsMain = document.createElement("h2")

        commentsMain.className = "comment-mainTitle"
        commentsBox.className = "comment-section"

        commentsMain.innerHTML = "Comments"

        body.appendChild(commentsMain)
        body.appendChild(commentsBox)

        for (let i=0; i<data2.length; i++) {
            const comment = document.createElement("li")
            const commentAuthor = document.createElement("h3")
            const commentBody = document.createElement("p")

            comment.className = "comment"
            commentAuthor.className = "comment-author"
            commentBody.className = "comment-body"

            commentAuthor.innerHTML = data2[i].name
            commentBody.innerHTML = data2[i].body

            comment.appendChild(commentAuthor)
            comment.appendChild(commentBody)
            commentsBox.appendChild(comment)

            commentsBox.insertBefore(comment, commentsBox.childNodes[0])
        }

    }).catch(onerror => console.error("Error", onerror));