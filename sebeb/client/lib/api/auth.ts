import { apiClient } from "./client";
import type {
  AuthResponse,
  LoginPayload,
  MeResponse,
  RegisterPayload,
  UpdateProfilePayload,
} from "./types";

export function registerUser(payload: RegisterPayload) {
  return apiClient<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: LoginPayload) {
  return apiClient<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getCurrentUser(token: string) {
  return apiClient<MeResponse>("/auth/me", {
    method: "GET",
    token,
  });
}

export function updateCurrentUser(
  token: string,
  payload: UpdateProfilePayload,
) {
  return apiClient<MeResponse>("/auth/me", {
    method: "PATCH",
    token,
    body: JSON.stringify(payload),
  });
}

export function logoutUser(token: string) {
  return apiClient<{ success: boolean; message: string }>("/auth/logout", {
    method: "POST",
    token,
  });
}
