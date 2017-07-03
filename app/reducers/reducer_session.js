import { LOG_USER } from '../common/constants';

export default function (state = { isLogged: false, user: {} }, { type, payload }) {
    switch (type) {
        case LOG_USER:
            return payload.data ? { user: payload.data, isLogged: true } : state;
            break;
    }
    return state;
}
