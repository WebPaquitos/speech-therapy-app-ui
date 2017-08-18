import _ from 'lodash';
import {
    FETCH_HISTORY,
    FETCH_HISTORY_ITEM,
} from '../common/constants';

export default function (state = {}, { type, payload }) {
    switch (type) {
        case FETCH_HISTORY:
            return _.mapKeys(payload, '_id');
            break;
        case FETCH_HISTORY_ITEM:
            return { ...state, [payload._id]: payload };
            break;
    }
    return state;
}
