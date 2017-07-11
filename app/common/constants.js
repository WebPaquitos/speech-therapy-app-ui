export const API_ENDPOINT = 'http://192.168.2.2:7771';
export const LOG_USER = 'LOG_USER';
export const LOG_USER_PENDING = 'LOG_USER_PENDING';
export const LOG_USER_FULFILLED = 'LOG_USER_FULFILLED';
export const LOG_USER_REJECTED = 'LOG_USER_REJECTED';
export const LOGOUT_USER = 'logout_user';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export const REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED';
export const REGISTER_USER_REJECTED = 'REGISTER_USER_REJECTED';
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
