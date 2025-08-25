import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Create axios instance with proper type annotation
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add auth token to requests with proper type checking
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Global response error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Adjust if needed
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  register: async (email: string, password: string, deviceId: string) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        email,
        password,
        deviceId,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },


  getDeviceData: async (deviceId: string) => {
    try {
      const response = await axiosInstance.get(`/api/device-data/${deviceId}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch device data' };
    }
  },
  //   getSensorData: async (deviceId: string) => {
//     try {
//       const response = await axiosInstance.get(`/api/sensors/${deviceId}`);
//       return response.data;
//     } catch (error: any) {
//       throw error.response?.data || { message: 'Failed to fetch sensor data' };
//     }
//   },
// };

  // toggleDevice: async (deviceId: string, device: string, status: boolean) => {
  //   try {
  //     const response = await axiosInstance.post(`/api/devices/${deviceId}/toggle`, { device, status });
  //     return response.data;
  //   } catch (error: any) {
  //     throw error.response?.data || { message: 'Failed to toggle device' };
  //   }
  // },
};
export default apiService;
