const state = {
  shows: [],
  filtered: [],
  page: 1,
  limit: 20,
  genre: "all",
  loading: false,
  total: 0

};


// funcion para obtener llave
export function getState(key){
    return state[key];
}

export function setState(key, newValue) {
    state[key] = newValue;
    
}