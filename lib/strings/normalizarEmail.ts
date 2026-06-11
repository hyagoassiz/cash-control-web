import { removerEspacos } from "@/lib/strings/removerEspacos";

export function normalizarEmail(valor: string): string {
  return removerEspacos(valor).toLowerCase();
}
