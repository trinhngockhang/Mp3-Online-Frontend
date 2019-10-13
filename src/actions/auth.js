import axios from 'axios';
import localStorage from 'localStorage';
const LOGIN = 'LOGIN';

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
        dispatch(loginFail(err.message));
      });
  };
};

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
  type: 'LOGIN_FAIL'
});