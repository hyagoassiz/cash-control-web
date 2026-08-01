import { CategoryRequestDTO } from "@/modules/finance/categories/dto/categoryDto";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseCategoryFormReturn {
  categoryForm: UseFormReturn<CategoryRequestDTO>;
}

const useCategoryForm = (): UseCategoryFormReturn => {
  const categoryForm = useForm<CategoryRequestDTO>();

  return { categoryForm };
};

export default useCategoryForm;
