import { apiClient } from "@/lib/api/apiClient";
import { LoginRequestDTO, LoginResponseDTO } from "@/modules/user/dto/loginDto";
import { UserRequestDTO, UserResponseDTO } from "@/modules/user/dto/userDto";

export async function postUsuario(
  payload: UserRequestDTO,
): Promise<UserResponseDTO> {
  return await apiClient("/usuarios", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function postLoginUsuario(
  payload: LoginRequestDTO,
): Promise<LoginResponseDTO> {
  return await apiClient("/usuarios/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
