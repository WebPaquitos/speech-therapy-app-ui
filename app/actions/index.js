import axios from 'axios';
import {
    API_ENDPOINT, LOG_USER,
    LOGOUT_USER, REGISTER_USER,
    FETCH_HISTORY, MASA_SUBMIT,
} from '../common/constants';

export function loginUser(data, callback) {
    // const loggingUser = axios.post(`${API_ENDPOINT}/login`, data).then(() => callback());
    // return {
    //     type: LOG_USER,
    //     payload: loggingUser,
    // };
    callback();
    localStorage.setItem('session', JSON.stringify({
        isLogged: true,
        user: {
            name: 'Joana Faria',
        },
    }));
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
    localStorage.setItem('session', JSON.stringify({
        isLogged: false,
        user: {},
    }));
    return {
        type: LOGOUT_USER,
        payload: {
            data: {
                isLogged: false,
                user: {},
            },
        },
    };
}

export function registerUser({ name, email, password }, callback) {
    // const registeringUser = axios.post(`${API_ENDPOINT}/register`, { name, email, password });
    // return {
    //     type: REGISTER_USER,
    //     payload: registeringUser,
    // };
    callback();
    localStorage.setItem('session', JSON.stringify({
        isLogged: true,
        user: {
            name: 'Joana Faria',
        },
    }));
    return {
        type: REGISTER_USER,
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
