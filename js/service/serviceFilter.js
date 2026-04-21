import { getState } from "../state/state.js";

export function filterByGenre(genre) {
    const shows = getState("shows");
    if (genre === "all") return shows;
    return shows.filter(show => show.genres && show.genres.includes(genre));
}

export function getAllGenres(shows) {
    const genres = new Set();
    shows.forEach(show => {
        if (show.genres) show.genres.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
}
