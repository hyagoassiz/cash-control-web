// lib/api/apiClient.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(JSON.stringify(data, null, 2));
    throw new Error(data.message ?? "Erro na requisição");
  }

  return data as T;
}
