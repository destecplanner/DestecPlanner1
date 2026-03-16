import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Standardize error handling
    const data = error.response?.data as any;
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
        localStorage.removeItem('auth_token');
        document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = '/auth/login';
      }
    }

    // Enhance the error object with Laravel specific structure if available
    const enhancedError = {
      ...error,
      message: data?.message || error.message,
      validationErrors: data?.errors || null,
      status: error.response?.status,
    };

    return Promise.reject(enhancedError);
  }
);

export default api;
