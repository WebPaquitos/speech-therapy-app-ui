export const API_ENDPOINT = 'http://192.168.1.30:7771';
export const LOG_USER = 'log_user';
export const LOGOUT_USER = 'logout_user';
export const REGISTER_USER = 'register_user';
export const FETCH_HISTORY = 'fetch_history';
export const FETCH_HISTORY_ITEM = 'fetch_history_item';
export const FETCH_PATIENTS = 'fetch_patients';
export const FETCH_PATIENT = 'fetch_patient';
export const FETCH_MASA = 'fetch_masa';
export const MASA_SUBMIT = 'masa_submit';
export const MASA_EVALUATION_CATEGORIES = {
    NORMAL: 'Nenhuma anormalidade detectada',
    LIGHT: 'Leve',
    MODERATE: 'Moderado',
    SEVERE: 'Severo',
};
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
    SHOW_HISTORY_ITEM: '/history/:id',
    PATIENTS: '/patients',
    SHOW_PATIENT: '/patients/:id',
};
