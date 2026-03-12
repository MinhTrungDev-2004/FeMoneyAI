import axios from "axios";

/**
 * Centralized Axios instance for API requests.
 * Vite proxy handles requests starting with /public and /categories.
 */
const api = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add interceptors here for token management, etc.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log(`API Request to ${config.url}, Token exists: ${!!token}`);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
