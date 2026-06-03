/*
  @author Gurnoor SINGH (102316101) 
*/
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Backend base URL
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
