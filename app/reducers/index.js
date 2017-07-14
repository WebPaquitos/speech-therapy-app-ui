import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import SessionReducer from './reducer_session';
import HistoryReducer from './reducer_history';
import PatientsReducer from './reducer_patients';
import MASAReducer from './reducer_masa';

const rootReducer = combineReducers({
    session: SessionReducer,
    history: HistoryReducer,
    patients: PatientsReducer,
    masa: MASAReducer,
    form: FormReducer,
});

export default rootReducer;
