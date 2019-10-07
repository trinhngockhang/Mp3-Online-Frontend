import { combineReducers } from 'redux';
import AuthReducers from './reducer_auth';
import SongReducer from './reducer_song';

const rootReducer = combineReducers({
  auth: AuthReducers,
  song: SongReducer,
});

export default rootReducer;
