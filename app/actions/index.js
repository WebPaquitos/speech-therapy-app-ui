import axios from 'axios';
import {
    API_ENDPOINT, LOG_USER,
    LOGOUT_USER, REGISTER_USER,
    FETCH_HISTORY, MASA_SUBMIT,
    STORAGE_KEYS, EMPTY_SESSION,
    FETCH_MASA, FETCH_PATIENTS,
} from '../common/constants';
import { saveJSONInStorage, removeJSONInStorage } from '../common/utils';

axios.defaults.withCredentials = true;

export function loginUser(values, callback) {
    return (dispatch) => {
        axios.post(`${API_ENDPOINT}/login`, values)
        .then(({ data }) => {
            dispatch({
                type: LOG_USER,
                payload: data,
            });
            saveJSONInStorage(STORAGE_KEYS.SESSION, data);
            callback();
        })
        .catch(({ response }) => {
            console.log(response);
        });
    };
}

export function logoutUser() {
    axios.get(`${API_ENDPOINT}/logout`);
    removeJSONInStorage(STORAGE_KEYS.SESSION);
    return {
        type: LOGOUT_USER,
        payload: EMPTY_SESSION,
    };
}

export function registerUser({ name, email, password }, callback) {
    return (dispatch) => {
        axios.post(`${API_ENDPOINT}/register`, { name, email, password })
        .then(({ data }) => {
            dispatch({
                type: REGISTER_USER,
                payload: data,
            });
            saveJSONInStorage(STORAGE_KEYS.SESSION, data);
            callback();
        })
        .catch(({ response }) => {
            console.log(response);
        });
    };
}

export function fetchHistory() {
    return (dispatch) => {
        axios.get(`${API_ENDPOINT}/masas`)
        .then(({ data }) => {
            dispatch({
                type: FETCH_HISTORY,
                payload: data,
            });
        })
        .catch(({ response }) => {
            console.log(response);
        });
    };
}

export function fetchPatients() {
    return (dispatch) => {
        axios.get(`${API_ENDPOINT}/patients`)
        .then(({ data }) => {
            dispatch({
                type: FETCH_PATIENTS,
                payload: data,
            });
        })
        .catch(({ response }) => {
            console.log(response);
        });
    };
}

export function fetchMASAModel() {
    return (dispatch) => {
        axios.get(`${API_ENDPOINT}/masa`)
        .then(({ data }) => {
            dispatch({
                type: FETCH_MASA,
                payload: data,
            });
        })
        .catch(({ response }) => {
            console.log(response);
        });
    };
}

export function submitMASA({ masaModel, values }, callback) {
    return (dispatch) => {
        const masaClone = { ...masaModel };
        masaClone.patient = {
            id: values.id.value,
            name: values.name.value,
            birthdate: values.birthdate.value.toDate(),
            description: values.description.value || null,
        };
        Object.keys(values).forEach((key) => {
            const field = masaClone.fields.find(({ name }) => name === key);
            if (field) field.chosen = values[key].value;
        });
        axios.post(`${API_ENDPOINT}/masa`, masaClone)
        .then(({ data }) => {
            dispatch({
                type: MASA_SUBMIT,
                payload: data,
            });
            callback();
        })
        .catch((error) => {
            console.log(error);
        });
    };
}
