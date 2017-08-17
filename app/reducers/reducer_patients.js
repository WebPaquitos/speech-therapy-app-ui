import { FETCH_PATIENTS } from '../common/constants';

export default function (state = [], { type, payload }) {
    switch (type) {
        case FETCH_PATIENTS:
            return payload || state;
            break;
    }
    return state;
}
