// Simple Blog:

let getPosts = (resource) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4  && request.status === 200) {
                let data = JSON.parse(request.responseText)
                resolve(data)
            } else if (request.readyState === 4) {
                reject("Could not fetch data")
            }
        });

        request.open("GET", resource)
        request.send();
    })
};


getPosts("http://localhost:3000/posts")
    .then(data => {
        const body = document.querySelector("body")
        const postContainer = document.createElement("div")
        postContainer.className = "grid-container"
        body.appendChild(postContainer)

        for (let i=0; i<30; i++) {
            const postCard = document.createElement("div")
            const postTitle = document.createElement("h3")
            const postCut = document.createElement("p")
            const postLink = document.createElement("a")
            const maxCharacter = 101

            postLink.href = "post.html#" + data[i].id;
            postLink.target = "_blank"

            postCard.className = "grid-item"
            postTitle.className = "title"

            postTitle.innerHTML = data[i].title
            postCut.innerHTML = data[i].body.substring(1,maxCharacter)
            postLink.innerText = "Learn more ➜ "

            postCard.appendChild(postTitle)
            postCard.appendChild(postCut)
            postCard.appendChild(postLink)
            postContainer.appendChild(postCard)

            location.hash = data[i].id
        }
    })
    .catch(error => { console.error("Error on rejected:", error)
    })
