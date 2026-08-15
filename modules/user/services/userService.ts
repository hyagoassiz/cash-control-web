import { apiClient } from "@/lib/api/apiClient";
import {
  CreateUserRequestDTO,
  UserLoginRequestDTO,
  UserLoginResponseDTO,
  UserResponseDTO,
} from "@/modules/user/types/user";

export async function postUser(
  payload: CreateUserRequestDTO,
): Promise<UserResponseDTO> {
  return await apiClient("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMe(): Promise<UserResponseDTO> {
  return await apiClient("/users/me", {
    method: "GET",
  });
}

export async function postUserLogin(
  payload: UserLoginRequestDTO,
): Promise<UserLoginResponseDTO> {
  return await apiClient("/users/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
