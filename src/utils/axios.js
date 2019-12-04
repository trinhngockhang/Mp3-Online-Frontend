import axios from 'axios';
import localStorage from 'localStorage';
const baseURL = process.env.REACT_APP_API_URL;
const ssoURL = process.env.REACT_APP_AUTHEN_SSO_URL;
export const axiosAuthen = async function(){
  console.log(baseURL);
    return new Promise(async (resolve, reject) => {
      const token = localStorage.getItem('token');
      const instance = axios.create({
        baseURL,
        headers: {authorization: `Bearer ${token}`}
      });
      resolve(instance);
    })
  }
export const axiosApi = axios.create({
  baseURL,
});
export const axiosSSO = axios.create({
  baseURL: ssoURL,
});
