"use client";
import { ControlledSelect } from "@/components/ControlledSelect/ControlledSelect";
import { ControlledTextField } from "@/components/ControlledTextField";
import { FormActions } from "@/components/FormActions/FormActions";
import useCategoryForm from "@/modules/finance/categories/components/CategoryForm/hooks/useCategoryForm";
import { transactionTypeOptions } from "@/modules/finance/constants/transactionTypeOptions";
import Stack from "@mui/material/Stack";
import { type ReactElement } from "react";

export function CategoryForm(): ReactElement {
  const { isEditMode, categoryForm, saveCategory } = useCategoryForm();

  return (
    <Stack spacing={2.5}>
      <ControlledTextField
        control={categoryForm.control}
        name="name"
        label="Nome"
      />

      <ControlledSelect
        control={categoryForm.control}
        name="transactionType"
        label="Tipo"
        options={transactionTypeOptions}
        disabled={isEditMode}
      />

      <ControlledTextField
        control={categoryForm.control}
        name="description"
        label="Descrição"
        multiline
        rules={{ maxLength: 100 }}
        inputProps={{ maxLength: 100 }}
      />

      <FormActions
        buttons={[
          {
            id: "cancel",
            label: "Cancelar",
            onClick: () => window.history.back(),
            variant: "outlined",
          },
          {
            id: "save",
            label: "Salvar",
            onClick: saveCategory,
          },
        ]}
      />
    </Stack>
  );
}
