import { getShowById } from "../service/service.js";
import { addFavorite, removeFavorite, isFavorite } from "../persistance/persistance.js";

function stripHtml(html) {
    if (!html) return "Sin descripción disponible.";
    return html.replace(/<[^>]*>/g, "");
}

function getImage(show) {
    return show.image?.original || show.image?.medium || "https://via.placeholder.com/400x600/1a1d29/9b59b6?text=Sin+imagen";
}

export async function initDetalleUI() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const container = document.getElementById("detalle");

    if (!id) {
        container.innerHTML = `<div class="error-state"><h2>ID no encontrado</h2><a href="index.html" class="btn-back">← Volver</a></div>`;
        return;
    }

    container.innerHTML = `<div class="loading-spinner full"><div class="spinner"></div><p>Cargando detalles...</p></div>`;

    try {
        const show = await getShowById(id);
        const fav = isFavorite(show.id);

        container.innerHTML = `
            <div class="detail-hero" style="background-image: url('${getImage(show)}')">
                <div class="detail-hero-overlay"></div>
            </div>
            <div class="detail-content">
                <div class="detail-poster">
                    <img src="${getImage(show)}" alt="${show.name}" onerror="this.src='https://via.placeholder.com/300x450/1a1d29/9b59b6?text=Sin+imagen'">
                </div>
                <div class="detail-info">
                    <h1 class="detail-title">${show.name}</h1>
                    <div class="detail-meta">
                        <span class="meta-badge">${show.rating?.average ? "⭐ " + show.rating.average : "⭐ N/A"}</span>
                        <span class="meta-badge">${show.language || "N/A"}</span>
                        <span class="meta-badge status-${(show.status || "").toLowerCase().replace(" ", "-")}">${show.status || "N/A"}</span>
                        ${show.premiered ? `<span class="meta-badge">📅 ${show.premiered}</span>` : ""}
                    </div>
                    <div class="detail-genres">
                        ${(show.genres || []).map(g => `<span class="genre-tag">${g}</span>`).join("") || "<span class='genre-tag'>Sin género</span>"}
                    </div>
                    <p class="detail-summary">${stripHtml(show.summary)}</p>
                    <div class="detail-buttons">
                        <button id="btnFav" class="btn-fav ${fav ? "active" : ""}">
                            ${fav ? "❤️ En favoritos" : "🤍 Agregar a favoritos"}
                        </button>
                        <a href="index.html" class="btn-back-link">← Volver al catálogo</a>
                    </div>
                </div>
            </div>`;

        document.getElementById("btnFav").addEventListener("click", () => {
            const btn = document.getElementById("btnFav");
            if (isFavorite(show.id)) {
                removeFavorite(show.id);
                btn.textContent = "🤍 Agregar a favoritos";
                btn.classList.remove("active");
            } else {
                addFavorite(show);
                btn.textContent = "❤️ En favoritos";
                btn.classList.add("active");
            }
        });

    } catch (err) {
        container.innerHTML = `<div class="error-state"><h2>Error cargando la serie</h2><p>${err.message}</p><a href="index.html" class="btn-back">← Volver</a></div>`;
    }
}
