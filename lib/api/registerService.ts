export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
};

export async function registerUser(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    message: `Conta criada com sucesso, ${payload.name}.`,
  };
}
