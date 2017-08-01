export const API_ENDPOINT = 'http://192.168.2.2:7771';
export const LOG_USER = 'LOG_USER';
export const LOG_USER_PENDING = 'LOG_USER_PENDING';
export const LOG_USER_FULFILLED = 'LOG_USER_FULFILLED';
export const LOG_USER_REJECTED = 'LOG_USER_REJECTED';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export const REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED';
export const REGISTER_USER_REJECTED = 'REGISTER_USER_REJECTED';
export const FETCH_HISTORY = 'FETCH_HISTORY';
export const FETCH_HISTORY_PENDING = 'FETCH_HISTORY_PENDING';
export const FETCH_HISTORY_FULFILLED = 'FETCH_HISTORY_FULFILLED';
export const FETCH_HISTORY_REJECTED = 'FETCH_HISTORY_REJECTED';
export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const FETCH_PATIENTS_PENDING = 'FETCH_PATIENTS_PENDING';
export const FETCH_PATIENTS_FULFILLED = 'FETCH_PATIENTS_FULFILLED';
export const FETCH_PATIENTS_REJECTED = 'FETCH_PATIENTS_REJECTED';
export const FETCH_MASA = 'FETCH_MASA';
export const FETCH_MASA_PENDING = 'FETCH_MASA_PENDING';
export const FETCH_MASA_FULFILLED = 'FETCH_MASA_FULFILLED';
export const FETCH_MASA_REJECTED = 'FETCH_MASA_REJECTED';
export const MASA_SUBMIT = 'MASA_SUBMIT';
export const STORAGE_KEYS = {
    SESSION: 'session',
};
export const EMPTY_SESSION = {
    isLogged: false,
    user: {},
};
export const ROUTES = {
    BASE: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    HOME: '/home',
    DASHBOARD: '/dashboard',
    NEW_EVALUATION: '/start_evaluation',
    MASA_TEST: '/masa_evaluation',
    HISTORY: '/history',
    SHOW_HISTORY_CASE: '/history/:id',
    PATIENTS: '/patients',
    SHOW_PATIENT: '/patients/:id',
};
