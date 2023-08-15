import axios from 'axios';
import { handleErrorResponse } from './helpers';
import { BASE_URL } from 'constants/app';



// Create a new Axios instance
const instance = axios.create({
  baseURL: BASE_URL, // Your API base URL
});


// Interceptors for request and response
instance.interceptors.request.use(
  (config) => {
    // You can modify the request config here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally eg: unauthorized
    handleErrorResponse(error)
    return Promise.reject(error);
  }
);

export default instance;
