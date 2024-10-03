import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add logic to attach token into headers
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle response
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/refresh-token`, {
            refresh: refreshToken,
          });
          const newAccessToken = response.data.access;
          if (newAccessToken) {
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(error.config);
          }
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
