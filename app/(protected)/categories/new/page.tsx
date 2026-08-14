import { PageHeader } from "@/components/PageHeader";
import { CategoryForm } from "@/modules/finance/categories/components/CategoryForm";

export const metadata = {
  title: "Nova Categoria | Cash Control",
};

export default function NewCategoryPage() {
  return (
    <>
      <PageHeader
        title="Nova categoria"
        subtitle="Crie categorias para organizar suas transações"
        breadcrumbs={[
          {
            label: "Categorias",
            href: "/categories",
          },
          {
            label: "Nova",
          },
        ]}
      />

      <CategoryForm />
    </>
  );
}
