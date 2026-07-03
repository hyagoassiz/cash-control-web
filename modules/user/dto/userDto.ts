export interface UserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export type UserResponseDTO = Pick<UserRequestDTO, "name" | "password">;
