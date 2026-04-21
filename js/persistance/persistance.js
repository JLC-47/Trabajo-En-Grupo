import { setItem, getItem } from "../storage/storage.js";

export function setLocalStorageValue(key, value) {
    setItem(key, value);
}

export function getLocalStorageValue(key) {
    return getItem(key);
}

export function clearLocalStorage() {
    import("./storage.js").then(m => m.clearAll());
}

export function getFavorites() {
    return getLocalStorageValue("favorites") || [];
}

export function addFavorite(show) {
    const favs = getFavorites();
    if (!favs.find(f => f.id === show.id)) {
        favs.push(show);
        setLocalStorageValue("favorites", favs);
    }
}

export function removeFavorite(id) {
    const favs = getFavorites().filter(f => f.id !== id);
    setLocalStorageValue("favorites", favs);
}

export function isFavorite(id) {
    return getFavorites().some(f => f.id === id);
}

export function getHistory() {
    return getLocalStorageValue("searchHistory") || [];
}

export function addToHistory(query) {
    if (!query.trim()) return;
    let history = getHistory().filter(h => h.toLowerCase() !== query.toLowerCase());
    history.unshift(query);
    history = history.slice(0, 8);
    setLocalStorageValue("searchHistory", history);
}

export function getSavedLimit() {
    return getLocalStorageValue("limit") || 20;
}

export function saveLimit(val) {
    setLocalStorageValue("limit", val);
}
