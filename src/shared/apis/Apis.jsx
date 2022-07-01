import axios from "axios";
import { getCookie } from "../Cookie";

/* 기본 api */
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/* token이 들어간 api */
export const apiToken = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiToken.interceptors.request.use(
  (config) => {
    const authorization = getCookie("token");
    config.headers.Authorization = `Bearer ${authorization}`;
    return config;
  },
  (error) => {}
);

/* formData용 api */
export const apiForm = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiForm.interceptors.request.use(
  (config) => {
    const authorization = getCookie("token");
    config.headers.Authorization = `Bearer ${authorization}`;
    config.headers = {
      "content-type": "multipart/form-data",
    };
    return config;
  },
  (error) => {}
);
