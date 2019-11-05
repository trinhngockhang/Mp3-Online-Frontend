import axios from 'axios';
import localStorage from 'localStorage';
import { axiosAuthen, axiosApi } from '../utils/axios';
export const LOGIN = 'LOGIN';
export const CHECKINIT = 'CHECKINIT';
export const GETME = 'GETME';
export const LOGOUT = 'LOGOUT';
export const LOGINFACEBOOK = 'LOGINFACEBOOK';
 
export const loginAction = ({ username, password }) => {
  return dispatch => {
    dispatch(loginStart());
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username,
        password,
      })
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        dispatch(loginSuccess(res.data.token));
      })
      .catch(err => {
        dispatch(loginFail());
      });
  };
};

export const loginFb = (accessToken) => {
  return dispatch => {
    axiosApi.post('/auth/login-fb', {
      accessToken
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(response.data.token));
    }).catch((e) => {

    });
  }
}

export const loginGg = (accessToken) => {
  return dispatch => {
    axiosApi.post('/auth/login-gg', {
      accessToken
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(loginSuccess(response.data.token));
    }).catch((e) => {

    });
  }
}

export const checkInit = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    console.log('token luc khoi dong', token);
    if(token){
      dispatch(loginInit(token));
    }
  }
}

export const logOut = () => {
  localStorage.removeItem('token');
  return dispatch => {
    return dispatch({
      type: LOGOUT,
      payload: {
        data : false,
        login: false
      }
    })
  }
}

export const getMe = () => {
  return async dispatch => {
    const axiosAu =  await axiosAuthen();
    const result =  await axiosAu.get('/users/me');
    dispatch(getInfoUser(result.data));
  }
}

const loginInit = (result) => ({
  type: CHECKINIT,
  payload: {
    token: result,
  }
})

const getInfoUser = data => ({
  type: GETME,
  payload: {
    user: data
  }
})

const loginSuccess = token => ({
  type: 'LOGIN_SUCCESS',
  payload: {
    token,
  }
});
const loginStart = () => ({
  type: 'LOGIN_START'
});

const loginFail = () => ({
  type: 'LOGIN_FAIL',
  payload: {
    loginFail: 'Tài khoản hoặc mật khẩu sai',
  }
});