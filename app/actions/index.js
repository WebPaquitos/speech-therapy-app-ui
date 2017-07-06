import axios from 'axios';
import { API_ENDPOINT, LOG_USER, LOGOUT_USER, REGISTER_USER } from '../common/constants';

export function loginUser(data, callback) {
    // const loggingUser = axios.post(`${API_ENDPOINT}/login`, data).then(() => callback());
    // return {
    //     type: LOG_USER,
    //     payload: loggingUser,
    // };
    callback();
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

export function registerUser(data, callback) {
    // const registeringUser = axios.post(`${API_ENDPOINT}/register`, data);
    // return {
    //     type: REGISTER_USER,
    //     payload: registeringUser,
    // };
    callback();
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
