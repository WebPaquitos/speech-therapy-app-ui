import _ from 'lodash';
import { FETCH_PATIENTS } from '../common/constants';

export default function (state = {}, { type, payload }) {
    switch (type) {
        case FETCH_PATIENTS:
            return _.mapKeys(payload, 'id');
            break;
    }
    return state;
}
