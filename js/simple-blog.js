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


// Javítás: a getPosts csak fetch-eljen és return-öljön, a műveletet külön függvénybe tenni
getPosts("http://localhost:3000/posts")
    .then(data => {
        const body = document.querySelector("body")
        const gridContainer = document.createElement("div")
        gridContainer.className = "grid-container"
        body.appendChild(gridContainer)

        for (let i=0; i<30; i++) {
            const divItem = document.createElement("div")
            const h3Item = document.createElement("h3")
            const pItem = document.createElement("p")
            const aItem = document.createElement("a")

            aItem.href = "post.html#" + data[i].id;
            aItem.target = "_blank"
            aItem.innerText = "Learn more ➜ "

            divItem.className = "grid-item"
            h3Item.className = "title"

            h3Item.innerHTML = data[i].title
            pItem.innerHTML = data[i].body.substring(1,101)

            divItem.appendChild(h3Item)
            divItem.appendChild(pItem)
            divItem.appendChild(aItem)
            gridContainer.appendChild(divItem)

            location.hash = data[i].id
        }
    })
    .catch(error => {
        console.log("Error on rejected:", error)
    })
