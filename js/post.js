// Simple Blog Post:

let hash = window.location.hash;
// kivágni: indexOf "#" splice vagy slice, amelyik return-öl és itt létrehozni a hash-ből kivett id-t
let postUrl = "https://jsonplaceholder.typicode.com/posts/";
postUrl += hash.replace('#', '');
let commentUrl = "https://jsonplaceholder.typicode.com/comments?postId=";
commentUrl += hash.replace('#', '');
const body = document.querySelector("body");


// nem szükséges ilyen sok DOM, markup-pal egyszerűbb!!

fetch(postUrl)
    .then(response => response.json())
    .then(data => {
        const divItem = document.createElement("div")
        const h1Item = document.createElement("h1")
        const h3Item = document.createElement("h3")
        const pItem = document.createElement("p")

        divItem.className = "header"
        h1Item.className = "header-item"
        h3Item.className = "header-item"
        pItem.className = "post-body"

        h1Item.innerHTML = data.title
        h3Item.innerHTML = "Author: " + data.userId
        pItem.innerHTML = data.body

        divItem.appendChild(h1Item)
        divItem.appendChild(h3Item)
        body.appendChild(divItem)
        body.appendChild(pItem)

        return fetch(commentUrl);
    })
    .then(response => response.json())

    .then(data2 => {
        const h2Item = document.createElement("h2")
        h2Item.innerHTML = "Comments"
        h2Item.className = "comment-section"
        body.appendChild(h2Item)

        for (let i=0; i<data2.length; i++) {
            const divItem2 = document.createElement("div")
            const h3Item2 = document.createElement("h3")
            const pItem2 = document.createElement("p")

            divItem2.className = "comment"
            h3Item2.className = "comment-author"
            pItem2.className = "comment-body"

            h3Item2.innerHTML = data2[i].name
            pItem2.innerHTML = data2[i].body

            divItem2.appendChild(h3Item2)
            divItem2.appendChild(pItem2)
            body.appendChild(divItem2)
        }

    }).catch(onerror => console.error("Error", onerror));
