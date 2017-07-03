import axios from 'axios';
import { API_ENDPOINT, LOG_USER } from '../common/constants';

export function loginUser(data, callback) {
    const loggingUser = axios.post(`${API_ENDPOINT}/login`, data).then(() => callback());
    return {
        type: LOG_USER,
        payload: loggingUser,
    };
}

export function dummy() {
    return {
        type: 'DUMMY',
        payload: {},
    };
}
