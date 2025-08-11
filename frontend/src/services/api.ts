// src/services/api.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  setAccessToken,
  clearTokens,
} from "./token";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// attach access token before each request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// refresh management
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // if no response or not 401, reject
    if (!err.response || err.response.status !== 401) {
      return Promise.reject(err);
    }

    // prevent infinite loop - mark retried requests
    if ((originalRequest as any)._retry) {
      return Promise.reject(err);
    }
    (originalRequest as any)._retry = true;

    if (isRefreshing) {
      // queue the request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        })
        .catch((e) => Promise.reject(e));
    }

    isRefreshing = true;

    try {
      const refresh_token = getRefreshToken();
      if (!refresh_token) throw new Error("No refresh token");

      const resp = await axios.post(
        `${API_BASE}/auth/refresh`,
        { refresh_token },
        { headers: { "Content-Type": "application/json" } }
      );

      const { access_token, refresh_token: newRefresh } = resp.data;
      if (!access_token) throw new Error("No access token in refresh response");

      // save new tokens
      setAccessToken(access_token);
      if (newRefresh) saveTokens(access_token, newRefresh);
      else setAccessToken(access_token);

      processQueue(null, access_token);

      // set header for original request and retry
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
      }
      return api(originalRequest);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      clearTokens();
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
