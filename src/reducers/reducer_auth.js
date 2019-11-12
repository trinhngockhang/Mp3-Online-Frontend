import { CHECKINIT, GETME, LOGOUT, LOGINFACEBOOK, TOKENEXPIRED } from '../actions/auth';

export default function(state = { logined: false, data: false }, action){
  console.log('action ne', action);
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return { ...state, logined: action.payload }
    case 'LOGIN_FAIL':
      return { ...state, loginFail: action.payload.loginFail }
    case CHECKINIT:
      return { ...state, logined: action.payload }
    case GETME:
      return { ...state, data: action.payload.user }
    case LOGINFACEBOOK:
      return { ...state, logined: action.payload }
    case LOGOUT:
      return { ...state, data: action.payload.data, logined: action.payload.logined }
    case TOKENEXPIRED:
      return { ...state, data: action.payload.data, logined: action.payload.login }
    default:
      return state;
  }
}