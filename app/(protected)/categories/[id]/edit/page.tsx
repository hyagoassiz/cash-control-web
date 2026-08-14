import { PageHeader } from "@/components/PageHeader";
import { CategoryForm } from "@/modules/finance/categories/components/CategoryForm";
import { Box } from "@mui/material";

export const metadata = {
  title: "Editar Categoria | Cash Control",
};

export default function EditCategoryPage() {
  return (
    <Box>
      <PageHeader
        title="Editar categoria"
        subtitle="Crie categorias para organizar suas transações"
        breadcrumbs={[
          {
            label: "Categorias",
            href: "/categories",
          },
          {
            label: "Editar",
          },
        ]}
      />
      <CategoryForm />
    </Box>
  );
}
