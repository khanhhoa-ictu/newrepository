import Axios from 'axios';
import Cookies from 'js-cookie';
import { history } from '../App';
import configs from '../config';

const axiosInstance = Axios.create({
  timeout: 10000,
  baseURL: configs.API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const logout = () => {
  Cookies.remove('token');
  Cookies.remove('refreshToken');
  history.push('/');
};
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    const originalConfig = error.config;
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      logout();
      return Promise.reject(error);
    }
    return Axios.post(`${configs.API_DOMAIN}refreshToken`, {
      refreshToken,
    })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          console.log(data.token)
          Cookies.set('token', data.token);
          originalConfig.headers.Authorization = `Bearer ${data.token}`;
          return Axios(originalConfig);
        } else {
          logout();
          return Promise.reject(error);
        }
      })
      .catch(() => {
        logout();
        return Promise.reject(error);
      });
  }
);

export const sendGet = (url: string, params?: any) => axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
  axiosInstance.post(url, params, { params: queryParams }).then((res) => res.data);
export const sendPut = (url: string, params?: any) => axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) => axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) => axiosInstance.delete(url, { params }).then((res) => res.data);
