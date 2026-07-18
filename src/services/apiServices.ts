import axios from 'axios';
import { API_CONFIG } from '../config/constant';
import { Storage } from '../utils/storage';

const apiService = axios.create({
  baseURL: `${API_CONFIG.API_BASE_URL}/api/${API_CONFIG.API_VERSION}`,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiService.interceptors.request.use(async config => {
  const token = await Storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiService.interceptors.response.use(
    response => response,
    async error => {
      console.log('API ERROR:', error.response?.data || error.message);
  
      switch (error.response?.status) {
        case 401:
          await Storage.removeToken();
          console.log('Unauthorized');
          break;
  
        case 403:
          console.log('Forbidden');
          break;
  
        case 404:
          console.log('Not Found');
          break;
  
        case 500:
          console.log('Server Error');
          break;
  
        default:
          break;
      }
  
      return Promise.reject(error);
    },
  );


  export default apiService;