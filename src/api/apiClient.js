import axios from "axios";

// All calls use relative /api base; in dev Vite proxies to http://localhost:8080
export const api = axios.create({
//  baseURL: import.meta.env.VITE_API_BASE_URL || "https://blooms-1.onrender.com/api",
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if(token && token !== "undefined"){
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// For endpoints that expect form-url-encoded rather than JSON
export function postForm(url, data) {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  });

  return api.post(url, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
}

export default api;