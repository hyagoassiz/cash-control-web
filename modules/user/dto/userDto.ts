export interface UserRequestDTO {
  nome: string;
  email: string;
  senha: string;
}

export type UserResponseDTO = Pick<UserRequestDTO, "nome" | "senha">;
