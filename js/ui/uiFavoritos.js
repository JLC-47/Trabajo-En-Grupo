import { obtenerFavoritos } from "./storage.js";

export function initFavoritosUI() {
    const cont = document.getElementById("contenedorShows");

    obtenerFavoritos().forEach((s) => {
    const c = document.createElement("div");
    c.className = "card";

    c.innerHTML = `
    <img src="${s.image?.medium}">
    <h3>${s.name}</h3>
    `;

    cont.appendChild(c);
    });
}
