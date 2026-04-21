const state = {
    shows : [],
    filtered: [],
    limit : 20,
    page: 1,
    genre: "all"
};


// funcion para obtener llave
export function getState(key){
    return state[key];
}

export function setState(key, newValue) {
    state[key] = newValue;
    
}