import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import {
  CategoryRequestDTO,
  CategoryResponseDTO,
} from "@/modules/finance/categories/dto/categoryDto";
import {
  getCategoryById,
  postCategory,
  putCategory,
} from "@/modules/finance/categories/services/categoryService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

type CategoryFormValues = Pick<
  CategoryRequestDTO,
  "name" | "description" | "transactionType" | "id"
>;
interface UseCategoryFormReturn {
  isEditMode: boolean;
  categoryForm: UseFormReturn<CategoryFormValues>;
  saveCategory(): void;
}

const useCategoryForm = (): UseCategoryFormReturn => {
  const categoryForm = useForm<CategoryFormValues>();

  const { id } = useParams();

  const router = useRouter();

  const isEditMode = Boolean(id);

  const { data: category } = useQuery({
    queryFn: () => getCategoryById(Number(id)),
    queryKey: ["category", id],
    enabled: Boolean(id),
  });

  const mutationPostCategory = useMutation<
    CategoryResponseDTO,
    ApiErrorResponse,
    CategoryRequestDTO
  >({
    mutationFn: isEditMode ? putCategory : postCategory,
    onSuccess: (category) => {
      if (isEditMode) return;

      router.push(`/categories/${category.id}/edit`);
    },
    onError: (error) => {
      error?.errors?.forEach((item) => {
        categoryForm.setError(item.field as keyof CategoryFormValues, {
          message: item.message,
        });
      });
    },
  });

  function saveCategory(): void {
    categoryForm.handleSubmit(async (data) => {
      mutationPostCategory.mutateAsync({
        id: data.id,
        active: true,
        description: data.description,
        name: data.name,
        transactionType: data.transactionType,
      });
    })();
  }

  useEffect(() => {
    if (category) {
      categoryForm.reset({
        ...category,
        name: category.name,
        description: category.description,
        transactionType: category.transactionType,
      });
    }
  }, [category, categoryForm]);

  return { isEditMode, categoryForm, saveCategory };
};

export default useCategoryForm;
