export const API_ENDPOINT = 'http://192.168.1.30:8080';
export const LOG_USER = 'log_user';
export const LOGOUT_USER = 'logout_user';
export const REGISTER_USER = 'register_user';
export const FETCH_HISTORY = 'fetch_history';
export const MASA_SUBMIT = 'masa_submit';
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
};
