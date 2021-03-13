// Simple Blog Add comments:

const form = document.querySelector("form")
const submit = document.getElementById("submit")
const name = document.getElementById("name")
const email = document.getElementById("email")
const commentText = document.getElementById("comment")

document.querySelectorAll('.form-item').forEach(item => {
    item.addEventListener('keyup', event => {
        if (name.value.length !== 0 && email.value.length !== 0 && commentText.value.length !== 0) {
            submit.disabled = false }
        else { submit.disabled = true }
    })
})

submit.addEventListener("click", event => {
    event.preventDefault();
    let hash = window.location.hash.replace('#', '');
    const obj = {
        "postId": hash,
        "name": form.name.value,
        "email": form.email.value,
        "body": form.comment.value
    }
    const comment = JSON.stringify(obj);
    const messageBox = document.getElementById("message")

    name.value = ""
    email.value = ""
    commentText.value = ""

    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: comment
    })
        .then(response => {
            if (!response.ok) {
                messageBox.innerHTML = "Could not sent your message!"
            } else {
                location.reload()
                return response.text()
            }
        })
        .catch(onerror => console.error(onerror))
})
