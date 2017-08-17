export function getJSONFromStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        throw new Error(e);
    }
}

export function saveJSONInStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        throw new Error(e);
    }
}

export function removeJSONInStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        throw new Error(e);
    }
}
