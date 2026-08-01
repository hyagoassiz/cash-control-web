"use client";
import { ControlledSelect } from "@/components/ControlledSelect/ControlledSelect";
import { ControlledTextField } from "@/components/ControlledTextField";
import { FormActions } from "@/components/FormActions/FormActions";
import { PageHeader } from "@/components/PageHeader";
import useCategoryForm from "@/modules/finance/categories/components/CategoryForm/hooks/useCategoryForm";
import Stack from "@mui/material/Stack";
import { type ReactElement } from "react";

export function CategoryForm(): ReactElement {
  const { categoryForm } = useCategoryForm();

  return (
    <Stack spacing={2.5}>
      <PageHeader
        title="Nova categoria"
        subtitle="Crie categorias para organizar suas transações"
        breadcrumbs={[
          {
            label: "Categorias",
          },
          {
            label: "Nova",
          },
        ]}
      />

      <ControlledSelect
        control={categoryForm.control}
        name="transactionType"
        label="Tipo"
        options={[
          { label: "Entrada", value: "income" },
          { label: "Saída", value: "expense" },
        ]}
      />
      <ControlledTextField
        control={categoryForm.control}
        name="name"
        label="Nome"
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
            onClick: () => console.log("cancelar"),
            variant: "outlined",
          },
          {
            id: "save",
            label: "Salvar",
            onClick: () => console.log("salvar"),
          },
        ]}
      />
    </Stack>
  );
}
