import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Your backend URL
});

// Automatically attach JWT token and handle Content-Type dynamically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Ensure Content-Type is set dynamically
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"]; // Let browser set correct boundary
  }

  return config;
});

export default API;