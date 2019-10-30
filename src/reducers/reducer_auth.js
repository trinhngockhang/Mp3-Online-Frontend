import { CHECKINIT, GETME, LOGOUT } from '../actions/auth';

export default function(state = { logined: false, data: false }, action){
  console.log('action ne', action);
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return { ...state, logined: action.payload }
    case CHECKINIT:
      return { ...state, logined: action.payload }
    case GETME:
      return { ...state, data: action.payload.user }
    case LOGOUT:
      return { ...state, data: action.payload.data, logined: action.payload.logined }
    default:
      return state;
  }
}