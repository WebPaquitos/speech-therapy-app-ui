import { FETCH_PATIENTS_FULFILLED } from '../common/constants';

export default function (state = [], { type, payload }) {
    switch (type) {
        case FETCH_PATIENTS_FULFILLED:
            return payload.data ? payload.data : state;
            break;
    }
    return state;
}
