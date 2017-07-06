import axios from 'axios';
import { API_ENDPOINT, LOG_USER, LOGOUT_USER } from '../common/constants';

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
