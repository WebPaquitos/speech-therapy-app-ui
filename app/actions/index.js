import axios from 'axios';
import {
    API_ENDPOINT, LOG_USER,
    LOGOUT_USER, REGISTER_USER,
    FETCH_HISTORY, MASA_SUBMIT,
    STORAGE_KEYS, EMPTY_SESSION,
} from '../common/constants';
import { saveJSONInStorage } from '../common/utils';

export function loginUser(data, callback) {
    // const loggingUser = axios.post(`${API_ENDPOINT}/login`, data).then(() => callback());
    // return {
    //     type: LOG_USER,
    //     payload: loggingUser,
    // };
    callback();
    saveJSONInStorage(STORAGE_KEYS.SESSION, {
        isLogged: true,
        user: {
            name: 'Joana Faria',
        },
    });
    return {
        type: LOG_USER,
        payload: {
            data: {
                isLogged: true,
                user: {
                    name: 'Joana Faria',
                },
            },
        },
    };
}

export function logoutUser(data) {
    // const loggingOutUser = axios.post(`${API_ENDPOINT}/logout`, data);
    // return {
    //     type: LOGOUT_USER,
    //     payload: loggingOutUser,
    // };
    saveJSONInStorage(STORAGE_KEYS.SESSION, EMPTY_SESSION);
    return {
        type: LOGOUT_USER,
        payload: {
            data: EMPTY_SESSION,
        },
    };
}

export function registerUser({ name, email, password }, callback) {
    const registeringUser = axios.post(`${API_ENDPOINT}/register`, { name, email, password });
    return {
        type: REGISTER_USER,
        payload: registeringUser,
        bundle: {
            cb: callback,
            storage: saveJSONInStorage,
        },
    };
    // callback();
    // return {
    //     type: REGISTER_USER,
    //     payload: {
    //         data: {
    //             isLogged: true,
    //             user: {
    //                 name: 'Joana Faria',
    //             },
    //         },
    //     },
    // };
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
