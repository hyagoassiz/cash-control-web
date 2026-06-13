import { apiClient } from "@/lib/api/apiClient";
import {
  UsuarioRequestDTO,
  UsuarioResponseDTO,
} from "@/modules/usuario/dto/usuarioDto";

export async function postUsuarios(
  payload: UsuarioRequestDTO,
): Promise<UsuarioResponseDTO> {
  return await apiClient("/usuarios", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
