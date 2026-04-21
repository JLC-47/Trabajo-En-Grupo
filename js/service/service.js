import { setState, getState } from "../state/state.js";

const link = "https://api.tvmaze.com";

// esta funcion me va a obtener los show
export async function getShows() {
    setState("loading", true);
    try {
        const response = await fetch(`${link}/shows`);

        if (!response.ok) {
            throw new Error("Error al cargar shows");
        }
        //
        const datosGuardados = await response.json();
        setState("filtered", datosGuardados);
        //
        return await datosGuardados;
    } catch (error) {
        throw error;
    }finally{
        setState("loading", false);
    }
    
}
// este va a buscar los datos que ya tengo en showsList
export function getShowFromState(id) {
    const showsList = getState("shows");
    return showsList.find((s) => s.id === id);
}


