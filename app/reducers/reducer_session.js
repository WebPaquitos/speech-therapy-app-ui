import {
    LOG_USER_FULFILLED, LOGOUT_USER,
    REGISTER_USER_FULFILLED,
} from '../common/constants';

export default function (state = {}, { type, payload }) {
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
