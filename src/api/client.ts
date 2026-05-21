import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Token injection will be added in Auth step
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response Interceptor
client.interceptors.response.use(
  response => response.data,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      'Something went wrong';

    console.error(`[API Error] ${error.config?.url}:`, message);

    return Promise.reject(new Error(message));
  },
);

export default client;