import axios from 'axios';
import {
    API_ENDPOINT, LOG_USER,
    LOGOUT_USER, REGISTER_USER,
    FETCH_HISTORY, MASA_SUBMIT,
    STORAGE_KEYS, EMPTY_SESSION,
    FETCH_MASA,
} from '../common/constants';
import { saveJSONInStorage } from '../common/utils';

axios.defaults.withCredentials = true;

export function loginUser(values, callback) {
    const loggingUser = axios.post(`${API_ENDPOINT}/login`, values);
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
    axios.get(`${API_ENDPOINT}/logout`);
    saveJSONInStorage(STORAGE_KEYS.SESSION, EMPTY_SESSION);
    return {
        type: LOGOUT_USER,
        payload: EMPTY_SESSION,
    };
}

export function registerUser({ name, email, password }, callback) {
    const registeringUser = axios.post(`${API_ENDPOINT}/register`, { name, email, password });
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

export function fetchMASAModel() {
    const fetchingMASA = axios.get(`${API_ENDPOINT}/masa`);
    return {
        type: FETCH_MASA,
        payload: fetchingMASA,
    };
}

export function submitMASA({ masaModel, values }, callback) {
    const masaClone = { ...masaModel };
    masaClone.patient = {
        name: values.name,
        birthdate: values.birthdate.toDate(),
        description: values.description || null,
    };
    Object.keys(values).forEach((key) => {
        const field = masaClone.fields.find(({ name }) => name === key);
        if (field) field.chosen = values[key];
    });
    const submittingMASA = axios.post(`${API_ENDPOINT}/masa`, masaClone);
    submittingMASA.then(() => {
        callback();
    }).catch((error) => {
        console.log(error);
    });
    return {
        type: MASA_SUBMIT,
        payload: submittingMASA,
    };
}
