import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import SessionReducer from './reducer_session';
import HistoryReducer from './reducer_history';

const rootReducer = combineReducers({
    session: SessionReducer,
    history: HistoryReducer,
    form: FormReducer,
});

export default rootReducer;
