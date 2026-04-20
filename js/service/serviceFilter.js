import { getState } from "../state/state.js";

export function filterShowsByName(nombre) {
    const showsList = getState("shows");
    const resultados = [];

    showsList.forEach(function(show) {
        if (show.name.toLowerCase().includes(nombre.toLowerCase())) {
            resultados.push(show);
        }
    });

    return resultados;
}