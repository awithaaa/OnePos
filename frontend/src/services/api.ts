// api.ts
import axios, { AxiosError, type AxiosInstance } from "axios";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// attach token
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // if unauthorized & not retrying already
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue requests while refreshing
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 🔄 call refresh endpoint (cookie will be sent automatically)
        const res = await axios.post(
          "http://localhost:8000/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        console.log("refreshed");

        // update header for queued requests
        onRefreshed(newAccessToken);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        localStorage.removeItem("access_token");
        window.location.href = "/"; // redirect to login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
