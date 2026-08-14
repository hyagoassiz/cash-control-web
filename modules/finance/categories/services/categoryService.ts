import { apiClient } from "@/lib/api/apiClient";
import {
  CategoryRequestDTO,
  CategoryResponseDTO,
} from "@/modules/finance/categories/dto/categoryDto";

export function postCategory(
  payload: CategoryRequestDTO,
): Promise<CategoryResponseDTO> {
  return apiClient("/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function putCategory(
  payload: CategoryRequestDTO,
): Promise<CategoryResponseDTO> {
  const { id, ...rest } = payload;
  return apiClient(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(rest),
  });
}

export function getCategoryById(id: number): Promise<CategoryResponseDTO> {
  return apiClient(`/categories/${id}`, {
    method: "GET",
  });
}
