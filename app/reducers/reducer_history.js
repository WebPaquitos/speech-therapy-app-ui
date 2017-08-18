import {
    FETCH_HISTORY,
    FETCH_HISTORY_ITEM,
} from '../common/constants';

export default function (state = [], { type, payload }) {
    switch (type) {
        case FETCH_HISTORY:
            return payload || state;
            break;
        case FETCH_HISTORY_ITEM:
            console.log('lol');
            return [...state, payload];
            break;
    }
    return state;
}
