import axiosClient from "../api/axiosClient";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth.types";

const AUTH_BASE_PATH = "/auth";

export async function registerSupplier(
  request: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await axiosClient.post<RegisterResponse>(
    `${AUTH_BASE_PATH}/register`,
    request,
  );

  return response.data;
}

export async function loginSeller(
  request: LoginRequest,
): Promise<LoginResponse> {
  const response = await axiosClient.post<LoginResponse>(
    `${AUTH_BASE_PATH}/login`,
    request,
  );

  if (response.data.token) {
    localStorage.setItem("token",response.data.token);
    localStorage.setItem("sellerId", response.data.sellerId);
  }

  return response.data;
}

export function logoutSupplier(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export function isSupplierLoggedIn(): boolean {
  return Boolean(localStorage.getItem("accessToken"));
}