import axios from 'axios';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to refresh the token
const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('Refresh token not available');

    const response = await axios.post('http://127.0.0.1:8000/authorize/api/token/refresh/', {
      refresh,
    });

    // Store the new access token
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Token refresh failed:', error);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
    throw error;
  }
};

// Add a request interceptor to include the access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); 
      } catch (refreshError) {
        console.error('Token refresh or retry failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
