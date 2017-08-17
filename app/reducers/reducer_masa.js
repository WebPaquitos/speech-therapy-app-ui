import { FETCH_MASA } from '../common/constants';

export default function (state = {}, { type, payload }) {
    switch (type) {
        case FETCH_MASA:
            return payload || state;
            break;
    }
    return state;
}
