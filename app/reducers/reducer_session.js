import {
    LOG_USER_FULFILLED, LOGOUT_USER,
    REGISTER_USER_FULFILLED,
    STORAGE_KEYS, EMPTY_SESSION,
} from '../common/constants';
import { getJSONFromStorage } from '../common/utils';

function getSession() {
    return getJSONFromStorage(STORAGE_KEYS.SESSION) || EMPTY_SESSION;
}

export default function (state = getSession(), { type, payload }) {
    switch (type) {
        case LOG_USER_FULFILLED:
        case REGISTER_USER_FULFILLED:
            return payload.data || state;
            break;
        case LOGOUT_USER:
            return payload;
            break;
    }
    return state;
}
