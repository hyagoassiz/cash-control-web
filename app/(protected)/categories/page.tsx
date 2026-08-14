import { PageHeader } from "@/components/PageHeader";
import { CategoryGrid } from "@/modules/finance/categories/components/CategoryGrid";
import { Box, Button } from "@mui/material";

export const metadata = {
  title: "Categorias | Cash Control",
};

export default function CategoriesPage() {
  return (
    <Box>
      <PageHeader
        title="Categorias"
        subtitle="Crie categorias para organizar suas transações"
        breadcrumbs={[
          {
            label: "Categorias",
          },
        ]}
        actions={
          <Button variant="contained" href="/categories/new">
            Nova categoria
          </Button>
        }
      />

      <CategoryGrid />
    </Box>
  );
}
