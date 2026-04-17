const state = {
    loading: false,
    shows : [],
    limit : 20,
    page: 0,
    total: 0,
};



export function getState(key){
    return state[key];
}

export function setState(key, newValue) {
    state[key] = newValue;
    
}