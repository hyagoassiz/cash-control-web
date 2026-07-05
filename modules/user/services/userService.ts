import { apiClient } from "@/lib/api/apiClient";
import { LoginRequestDTO, LoginResponseDTO } from "@/modules/user/dto/loginDto";
import { UserRequestDTO, UserResponseDTO } from "@/modules/user/dto/userDto";

export async function postUser(
  payload: UserRequestDTO,
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
  payload: LoginRequestDTO,
): Promise<LoginResponseDTO> {
  return await apiClient("/users/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
