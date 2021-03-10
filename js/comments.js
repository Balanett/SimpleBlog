const form = document.querySelector("form")
const submit = document.getElementById("submit")

submit.addEventListener("click", event => {
    event.preventDefault();
    let hash = window.location.hash.replace('#', '');
    // console.log(hash, form.name.value, form.email.value, form.comment.value)
    var comment = JSON.stringify({"postId": hash, "name": form.name.value,
        "email": form.email.value, "body": form.comment.value});
    console.log(comment)
    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: comment
    })
        .then(resp => resp.text())
        .then(data => console.log(data));
})
