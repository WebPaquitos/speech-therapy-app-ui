import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import SessionReducer from './reducer_session';

const rootReducer = combineReducers({
    session: SessionReducer,
    form: FormReducer,
});

export default rootReducer;
