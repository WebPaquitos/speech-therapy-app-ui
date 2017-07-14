import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import SessionReducer from './reducer_session';
import HistoryReducer from './reducer_history';
import PatientsReducer from './reducer_patients';
import MASAReducer from './reducer_masa';
import { LOGOUT_USER } from '../common/constants';

const appReducer = combineReducers({
    session: SessionReducer,
    history: HistoryReducer,
    patients: PatientsReducer,
    masa: MASAReducer,
    form: FormReducer,
});

const rootReducer = (state, action) => {
    let stateRef = state;
    if (action.type === LOGOUT_USER) {
        stateRef = undefined;
    }
    return appReducer(stateRef, action);
};

export default rootReducer;
