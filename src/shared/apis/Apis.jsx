import axios from "axios";

import { getCookie } from "../Cookie";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const authorization = getCookie("token");
    config.headers.Authorization = `Bearer ${authorization}`;
    return config;
  },
  (error) => {

  }
);

export default api;
