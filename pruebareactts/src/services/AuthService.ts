// src/services/AuthService.ts
import axios from "axios";
import { LoginResponse } from "../models/dto/LoginResponse";
import { RefreshTokenResponse } from "../models/dto/RefreshTokenResponse";
import apiClient from "./interceptors";

const AUTH_BASE = "http://localhost:8000/api";

export class AuthService {
    // Métodos estáticos para manejo localStorage
    static getAccessToken(): string | null {
        return localStorage.getItem("access_token");
    }
    static getRefreshToken(): string | null {
        return localStorage.getItem("refresh_token");
    }
    static setTokens(access: string, refresh: string) {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
    }
    static clearTokens() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    // Login contra SimpleJWT → guarda tokens al obtenerlos
    login(username: string, password: string): Promise<LoginResponse> {
        return axios
        .post<LoginResponse>(`${AUTH_BASE}/token/`, { username, password })
        .then((res) => {
            AuthService.setTokens(res.data.access, res.data.refresh);
            return res.data;
        });
    }

    // Refresh usando SimpleJWT
    refreshToken(): Promise<RefreshTokenResponse> {
        const refresh = AuthService.getRefreshToken();
        if (!refresh) return Promise.reject(new Error("No refresh token"));

        return axios
        .post<RefreshTokenResponse>(`${AUTH_BASE}/token/refresh/`, {
            refresh,
        })
        .then((res) => res.data);
    }

    // Logout: opcionalmente avisa al backend y limpia tokens
    logout(): Promise<void> {
        AuthService.clearTokens();
        return Promise.resolve();
    }

    // Otros endpoints de usuario con apiClient (ya llevan Authorization)
    me(): Promise<any> {
        return apiClient.get("users/me/").then((res) => res.data);
    }
    register(email: string, password: string): Promise<any> {
        return axios
        .post(`${AUTH_BASE}/auth/register/`, { email, password })
        .then((res) => res.data);
    }
}
