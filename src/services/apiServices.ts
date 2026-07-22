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

// Request Interceptor
apiService.interceptors.request.use(
  async config => {
    const token = await Storage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('================ REQUEST ================');
    console.log('URL:', `${config.baseURL}${config.url}`);
    console.log('METHOD:', config.method?.toUpperCase());
    console.log('HEADERS:', config.headers);
    console.log('QUERY PARAMS:', config.params);
    console.log('PAYLOAD:', config.data);
    console.log('=========================================');

    return config;
  },
  error => {
    console.log('REQUEST ERROR:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor
apiService.interceptors.response.use(
  response => {
    console.log('================ RESPONSE ================');
    console.log('URL:', `${response.config.baseURL}${response.config.url}`);
    console.log('STATUS:', response.status);
    console.log('RESPONSE:', response.data);
    console.log('==========================================');

    return response;
  },
  async error => {
    console.log('================ API ERROR ================');

    if (error.response) {
      console.log('URL:', `${error.config?.baseURL}${error.config?.url}`);
      console.log('METHOD:', error.config?.method?.toUpperCase());
      console.log('STATUS:', error.response.status);
      console.log('REQUEST PAYLOAD:', error.config?.data);
      console.log('ERROR RESPONSE:', error.response.data);
    } else {
      console.log('NETWORK ERROR:', error.message);
    }

    console.log('==========================================');

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
    }

    return Promise.reject(error);
  },
);

export default apiService;