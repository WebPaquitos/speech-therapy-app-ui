import {
    LOG_USER,
    LOGOUT_USER,
    REGISTER_USER,
} from '../common/constants';

export default function (state = {}, { type, payload }) {
    switch (type) {
        case LOG_USER:
        case REGISTER_USER:
            return payload || state;
            break;
        case LOGOUT_USER:
            return payload;
            break;
    }
    return state;
}
