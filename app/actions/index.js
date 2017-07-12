import axios from 'axios';
import {
    API_ENDPOINT, LOG_USER,
    LOGOUT_USER, REGISTER_USER,
    FETCH_HISTORY, MASA_SUBMIT,
    STORAGE_KEYS, EMPTY_SESSION,
} from '../common/constants';
import { saveJSONInStorage } from '../common/utils';

export function loginUser(values, callback) {
    const loggingUser = axios.post(`${API_ENDPOINT}/login`, values, {
        headers: {
            withCredentials: true,
        },
    });
    loggingUser.then(({ data }) => {
        saveJSONInStorage(STORAGE_KEYS.SESSION, data);
        callback();
    }).catch((error) => {
        console.log(error);
    });
    return {
        type: LOG_USER,
        payload: loggingUser,
    };
}

export function logoutUser() {
    axios.get(`${API_ENDPOINT}/logout`, {
        headers: {
            withCredentials: true,
        },
    });
    saveJSONInStorage(STORAGE_KEYS.SESSION, EMPTY_SESSION);
    return {
        type: LOGOUT_USER,
        payload: EMPTY_SESSION,
    };
}

export function registerUser({ name, email, password }, callback) {
    const registeringUser = axios.post(`${API_ENDPOINT}/register`, { name, email, password }, {
        headers: {
            withCredentials: true,
        },
    });
    registeringUser.then(({ data }) => {
        saveJSONInStorage(STORAGE_KEYS.SESSION, data);
        callback();
    }).catch((error) => {
        console.log(error);
    });
    return {
        type: REGISTER_USER,
        payload: registeringUser,
    };
}

export function fetchHistory() {
    // const fetchingHistory = axios.get(`${API_ENDPOINT}/history`);
    // return {
    //     type: HISTORY,
    //     payload: fetchingHistory,
    // };
    return {
        type: FETCH_HISTORY,
        payload: {
            data: [{ id: 1, name: 'Case 1' }],
        },
    };
}

export function submitMASA(data, callback) {
    // const submittingMASA = axios.post(`${API_ENDPOINT}/masa`, data);
    // return {
    //     type: MASA_SUBMIT,
    //     payload: submittingMASA,
    // };
    callback();
    return {
        type: MASA_SUBMIT,
        payload: {
            data: {},
        },
    };
}
