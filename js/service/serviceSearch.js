import { setState } from "../state/state";

const Shows = "https://api.tvmaze.com";

export async function searchShows(query) {
    setState("loading", true);

    try {
        const response = await fetch(`${Shows}/search/shows?q=${query}`);

        if (!response.ok) {
            throw new Error("Error en la búsqueda");
        }

        const data = await response.json();
        const shows = data.map(item => item.show);

        setState("shows", shows);
        setState("total", shows.length);

        return shows;
    } catch (error) {
        throw error;
    } finally {
        setState("loading", false);
    }
}