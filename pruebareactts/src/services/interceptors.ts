// src/services/interceptors.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { AuthService } from "./AuthService";

const API_BASE = "http://localhost:8000//api";

const apiClient = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers = config.headers ?? {};
        const token = AuthService.getAccessToken();
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
    (resp) => resp,
    async (error: AxiosError & { config?: InternalAxiosRequestConfig & { _retry?: boolean } }) => {
        const original = error.config;
        if (original && error.response?.status === 401 && !original._retry) {
            original._retry = true;
            try {
                // Solo viene { access: string }
                const { access } = await new AuthService().refreshToken();
                // Reutilizamos el refresh antiguo
                const refresh = AuthService.getRefreshToken()!;
                AuthService.setTokens(access, refresh);
                // Reintentar con el nuevo access
                original.headers!["Authorization"] = `Bearer ${access}`;
                return apiClient(original);
            } catch (e) {
                AuthService.clearTokens();
                window.location.href = "/login";
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
