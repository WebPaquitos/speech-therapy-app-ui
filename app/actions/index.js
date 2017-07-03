import axios from 'axios';
import { API_ENDPOINT, LOG_USER } from '../common/constants';

export function loginUser(data, callback) {
    const loggingUser = axios.post(`${API_ENDPOINT}/login`, data).then(() => callback());
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

export function dummy() {
    return {
        type: 'DUMMY',
        payload: {},
    };
}
