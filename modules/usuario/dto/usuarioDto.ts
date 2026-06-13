export interface UsuarioRequestDTO {
  nome: string;
  email: string;
  senha: string;
}

export type UsuarioResponseDTO = Pick<UsuarioRequestDTO, "nome" | "senha">;
