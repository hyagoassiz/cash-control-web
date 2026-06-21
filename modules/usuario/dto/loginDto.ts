export interface LoginRequestDTO {
  email: string;
  senha: string;
}

export interface LoginResponseDTO {
  mensagem: string;
  email: string;
}
