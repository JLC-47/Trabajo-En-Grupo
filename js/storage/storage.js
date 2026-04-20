import { getLocalStorageValue, setLocalStorageValue } from "../persistance/persistance.js";

const CLAVE_FAVORITOS = "favoritos";

export function obtenerFavoritos() {
    const favoritos = getLocalStorageValue(CLAVE_FAVORITOS);
    if (favoritos === null) {
        return [];
    }
    return favoritos;
}

export function guardarFavorito(show) {
    const favoritos = obtenerFavoritos();
    favoritos.push(show);
    setLocalStorageValue(CLAVE_FAVORITOS, favoritos);
}

export function eliminarFavorito(id) {
    const favoritos = obtenerFavoritos();
    const nuevosFavoritos = [];
    favoritos.forEach(function(show) {
        if (show.id !== id) {
            nuevosFavoritos.push(show);
        }
    });
    setLocalStorageValue(CLAVE_FAVORITOS, nuevosFavoritos);
}

export function esFavorito(id) {
    const favoritos = obtenerFavoritos();
    let encontrado = false;
    favoritos.forEach(function(show) {
        if (show.id === id) {
            encontrado = true;
        }
    });
    return encontrado;
}