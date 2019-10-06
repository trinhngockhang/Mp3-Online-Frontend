import { combineReducers } from 'redux';
import AuthReducers from './reducer_auth';

const rootReducer = combineReducers({
  auth: AuthReducers,
});

export default rootReducer;
