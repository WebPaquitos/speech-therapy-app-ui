import { combineReducers } from 'redux';
import SessionReducer from './reducer_session';

const rootReducer = combineReducers({
    session: SessionReducer,
});

export default rootReducer;
