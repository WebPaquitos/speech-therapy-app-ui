import { MASA_EVALUATION_CATEGORIES } from '../common/constants';

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

export function formatDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getColorForMASASeverity(severity) {
    switch (severity) {
        case MASA_EVALUATION_CATEGORIES.LIGHT:
            return 'text-success';
            break;
        case MASA_EVALUATION_CATEGORIES.MODERATE:
            return 'text-warning';
            break;
        case MASA_EVALUATION_CATEGORIES.SEVERE:
            return 'text-danger';
            break;
    }
    return '';
}
