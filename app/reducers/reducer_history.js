import { FETCH_HISTORY } from '../common/constants';

export default function (state = [], { type, payload }) {
    switch (type) {
        case FETCH_HISTORY:
            return payload.data ? payload.data : state;
            break;
    }
    return state;
}