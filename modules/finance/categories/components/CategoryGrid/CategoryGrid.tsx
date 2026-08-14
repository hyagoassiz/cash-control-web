"use client";
import { CategoryCard } from "@/modules/finance/categories/components/CategoryCard";
import { Box, Pagination } from "@mui/material";
import { type ReactElement } from "react";

export function CategoryGrid(): ReactElement {
  return (
    <Box>
      <CategoryCard
        name="teste"
        description="teste"
        type="expense"
        isActive={true}
      />

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination page={1} count={10} />
      </Box>
    </Box>
  );
}
