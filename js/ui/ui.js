import { getShows, searchShows } from "../service/service.js";
import { filterByGenre, getAllGenres } from "../service/serviceFilter.js";
import { getState, setState } from "../state/state.js";
import {
    getFavorites, addFavorite, removeFavorite, isFavorite,
    addToHistory, getHistory, getSavedLimit, saveLimit
} from "../persistance/persistance.js";

function stripHtml(html) {
    if (!html) return "Sin descripción disponible.";
    return html.replace(/<[^>]*>/g, "");
}

function getImage(show) {
    return show.image?.medium || show.image?.original || "https://via.placeholder.com/210x295/1a1d29/9b59b6?text=Sin+imagen";
}

function getRating(show) {
    return show.rating?.average ? `⭐ ${show.rating.average}` : "⭐ N/A";
}

function renderCards(shows) {
    const container = document.getElementById("contenedorShows");
    container.innerHTML = "";

    if (shows.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No se encontraron series</h3>
                <p>Intenta con otro término de búsqueda</p>
            </div>`;
        return;
    }

    const limit = getState("limit");
    const page = getState("page");
    const start = (page - 1) * limit;
    const pageShows = shows.slice(start, start + limit);

    pageShows.forEach((show, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${index * 40}ms`;
        const fav = isFavorite(show.id);

        card.innerHTML = `
            <img src="${getImage(show)}" alt="${show.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/210x295/1a1d29/9b59b6?text=Sin+imagen'">
            <div class="card-overlay">
                <h3 class="card-title">${show.name}</h3>
                <p class="card-genres">${(show.genres || []).join(", ") || "Sin género"}</p>
                <p class="card-rating">${getRating(show)}</p>
                <div class="card-actions">
                    <a href="indexDetalles.html?id=${show.id}" class="btn-detail">Ver detalles</a>
                </div>
            </div>
            <button class="fav-btn ${fav ? "active" : ""}" data-id="${show.id}" title="${fav ? "Quitar de favoritos" : "Agregar a favoritos"}">
                ${fav ? "❤️" : "🤍"}
            </button>`;

        card.querySelector(".fav-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            toggleFavorite(show, card.querySelector(".fav-btn"));
        });

        container.appendChild(card);
    });
}

function toggleFavorite(show, btn) {
    if (isFavorite(show.id)) {
        removeFavorite(show.id);
        btn.textContent = "🤍";
        btn.classList.remove("active");
        btn.title = "Agregar a favoritos";
    } else {
        addFavorite(show);
        btn.textContent = "❤️";
        btn.classList.add("active");
        btn.title = "Quitar de favoritos";
        showToast(`"${show.name}" añadido a favoritos`);
    }
}

function renderPagination(total) {
    const limit = getState("limit");
    const page = getState("page");
    const totalPages = Math.max(1, Math.ceil(total / limit));

    document.getElementById("pagina").textContent = `Página ${page} de ${totalPages}`;
    document.getElementById("prev").disabled = page <= 1;
    document.getElementById("next").disabled = page >= totalPages;
}

function populateGenres(shows) {
    const select = document.getElementById("filtroGenero");
    const genres = getAllGenres(shows);
    const current = select.value;
    select.innerHTML = `<option value="all">Todos los géneros</option>`;
    genres.forEach(g => {
        const opt = document.createElement("option");
        opt.value = g;
        opt.textContent = g;
        if (g === current) opt.selected = true;
        select.appendChild(opt);
    });
}

function renderHistory() {
    const container = document.getElementById("historial");
    const history = getHistory();
    container.innerHTML = "";
    if (history.length === 0) return;

    const label = document.createElement("span");
    label.className = "hist-label";
    label.textContent = "Recientes:";
    container.appendChild(label);

    history.forEach(term => {
        const chip = document.createElement("span");
        chip.className = "hist-item";
        chip.textContent = term;
        chip.addEventListener("click", () => {
            document.getElementById("inputBuscar").value = term;
            executeSearch(term);
        });
        container.appendChild(chip);
    });
}

function showToast(msg) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => { toast.classList.remove("show"); setTimeout(() => toast.remove(), 400); }, 2500);
}

function update() {
    const genre = getState("activeGenre");
    let shows = getState("filtered");
    if (genre !== "all") shows = shows.filter(s => s.genres && s.genres.includes(genre));
    renderCards(shows);
    renderPagination(shows.length);
}

async function executeSearch(query) {
    if (!query.trim()) return;
    setState("page", 1);
    setState("searchMode", true);
    document.getElementById("contenedorShows").innerHTML = `<div class="loading-spinner"><div class="spinner"></div><p>Buscando...</p></div>`;

    addToHistory(query);
    renderHistory();

    const results = await searchShows(query);
    setState("activeGenre", "all");
    document.getElementById("filtroGenero").value = "all";
    populateGenres(results);
    update();
}


export async function initUI() {
    
    const savedLimit = getSavedLimit();
    setState("limit", savedLimit);
    const inputLimite = document.getElementById("inputLimite");
    inputLimite.value = savedLimit;

  
    document.getElementById("contenedorShows").innerHTML = `<div class="loading-spinner"><div class="spinner"></div><p>Cargando series...</p></div>`;
    const shows = await getShows();
    populateGenres(shows);
    renderHistory();
    update();


    document.getElementById("botonBuscar").addEventListener("click", () => {
        const q = document.getElementById("inputBuscar").value;
        executeSearch(q);
    });

    document.getElementById("inputBuscar").addEventListener("keydown", e => {
        if (e.key === "Enter") {
            executeSearch(e.target.value);
        }
    });

  
    inputLimite.addEventListener("change", () => {
        const val = Math.max(1, Math.min(50, parseInt(inputLimite.value) || 20));
        setState("limit", val);
        setState("page", 1);
        saveLimit(val);
        update();
    });

  
    document.getElementById("filtroGenero").addEventListener("change", e => {
        setState("activeGenre", e.target.value);
        setState("page", 1);
        update();
    });

   
    document.getElementById("prev").addEventListener("click", () => {
        if (getState("page") > 1) {
            setState("page", getState("page") - 1);
            update();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    document.getElementById("next").addEventListener("click", () => {
        const genre = getState("activeGenre");
        let shows = getState("filtered");
        if (genre !== "all") shows = shows.filter(s => s.genres && s.genres.includes(genre));
        const totalPages = Math.ceil(shows.length / getState("limit"));
        if (getState("page") < totalPages) {
            setState("page", getState("page") + 1);
            update();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
}
