import axios from "axios";

/**
 * Centralized Axios instance for API requests.
 * Vite proxy handles requests starting with /public and /categories.
 */
const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

// Add interceptors here for token management, etc.
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
