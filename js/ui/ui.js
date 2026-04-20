const contenedorShows = document.getElementById("contenedorShows");


export function renderPosts(shows) {
    
    contenedorShows.innerHTML = "";
    shows.forEach((post) => {
        //const user = searchUser(post.userId);

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <div class="card">
            <img src="${post.image?.medium ||''}">
            <h3>${post.name}</h3>
            <p>${post.genres.join(", ")}</p>
            <p>⭐ ${post.rating?.average || "N/A"}</p>
        </div>
        `;


        contenedorShows.appendChild(card);
    });
}