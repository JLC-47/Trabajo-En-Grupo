import { getFavorites, removeFavorite } from "../persistance/persistance.js";

function getImage(show) {
    return show.image?.medium || show.image?.original || "https://via.placeholder.com/210x295/1a1d29/9b59b6?text=Sin+imagen";
}

function render() {
    const container = document.getElementById("contenedorShows");
    const favs = getFavorites();
    container.innerHTML = "";

    if (favs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💔</div>
                <h3>Tu lista de favoritos está vacía</h3>
                <p>Explora el catálogo y agrega series que te gusten</p>
                <a href="index.html" class="btn-go-home">Explorar catálogo</a>
            </div>`;
        return;
    }

    favs.forEach((show, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${index * 40}ms`;

        card.innerHTML = `
            <img src="${getImage(show)}" alt="${show.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/210x295/1a1d29/9b59b6?text=Sin+imagen'">
            <div class="card-overlay">
                <h3 class="card-title">${show.name}</h3>
                <p class="card-genres">${(show.genres || []).join(", ") || "Sin género"}</p>
                <p class="card-rating">${show.rating?.average ? "⭐ " + show.rating.average : "⭐ N/A"}</p>
                <div class="card-actions">
                    <a href="indexDetalles.html?id=${show.id}" class="btn-detail">Ver detalles</a>
                </div>
            </div>
            <button class="fav-btn active remove-fav" data-id="${show.id}" title="Quitar de favoritos">❌</button>`;

        card.querySelector(".remove-fav").addEventListener("click", (e) => {
            e.stopPropagation();
            removeFavorite(show.id);
            render();
        });

        container.appendChild(card);
    });
}

export function initFavoritosUI() {
    render();
}
