export const API_ENDPOINT = 'http://192.168.1.30:7771';
export const LOG_USER = 'LOG_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const FETCH_HISTORY = 'FETCH_HISTORY';
export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const FETCH_MASA = 'FETCH_MASA';
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
