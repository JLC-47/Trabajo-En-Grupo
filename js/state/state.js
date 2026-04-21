const state = {
    loading: false,
    shows: [],
    filtered: [],
    limit: 20,
    page: 1,
    activeGenre: "all",
    searchMode: false,
};

export function getState(key) {
    return state[key];
}

export function setState(key, newValue) {
    state[key] = newValue;
}
