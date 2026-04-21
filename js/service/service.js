import { setState } from "../state/state.js";

const API = "https://api.tvmaze.com";

export async function getShows() {
    setState("loading", true);
    try {
        const response = await fetch(`${API}/shows`);
        if (!response.ok) throw new Error("Error cargando shows");
        const data = await response.json();
        setState("shows", data);
        setState("filtered", data);
        return data;
    } catch (error) {
        console.error("Error cargando API:", error);
        return [];
    } finally {
        setState("loading", false);
    }
}

export async function searchShows(query) {
    setState("loading", true);
    try {
        const response = await fetch(`${API}/search/shows?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Error en búsqueda");
        const data = await response.json();
        const shows = data.map(item => item.show);
        setState("filtered", shows);
        setState("shows", shows);
        return shows;
    } catch (error) {
        console.error("Error buscando:", error);
        return [];
    } finally {
        setState("loading", false);
    }
}

export async function getShowById(id) {
    const response = await fetch(`${API}/shows/${id}`);
    if (!response.ok) throw new Error("Show no encontrado");
    return await response.json();
}
