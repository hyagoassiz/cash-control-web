import { apiClient } from "@/lib/api/apiClient";
import {
  LoginRequestDTO,
  LoginResponseDTO,
} from "@/modules/usuario/dto/loginDto";
import {
  UsuarioRequestDTO,
  UsuarioResponseDTO,
} from "@/modules/usuario/dto/usuarioDto";

export async function postUsuario(
  payload: UsuarioRequestDTO,
): Promise<UsuarioResponseDTO> {
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
