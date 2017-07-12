import { FETCH_MASA_FULFILLED } from '../common/constants';

export default function (state = {}, { type, payload }) {
    switch (type) {
        case FETCH_MASA_FULFILLED:
            return payload.data ? payload.data : state;
            break;
    }
    return state;
}
