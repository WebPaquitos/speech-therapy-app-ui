import { LOG_USER, LOGOUT_USER, REGISTER_USER } from '../common/constants';

export default function (state = { isLogged: false, user: {} }, { type, payload }) {
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
