import { LOG_USER, LOGOUT_USER, REGISTER_USER, STORAGE_KEYS, EMPTY_SESSION } from '../common/constants';
import { getJSONFromStorage } from '../common/utils';

function getSession() {
    return getJSONFromStorage(STORAGE_KEYS.SESSION) || EMPTY_SESSION;
}

export default function (state = getSession(), { type, payload }) {
    switch (type) {
        case LOG_USER:
        case REGISTER_USER:
            return payload.data ? payload.data : state;
            break;
        case LOGOUT_USER:
            return payload.data;
            break;
    }
    return state;
}
