"use client";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { type ReactElement } from "react";

interface CategoryCardProps {
  name: string;
  description: string;
  type: "income" | "expense";
  isActive: boolean;
}

export function CategoryCard({
  name,
  description,
  type,
  isActive,
}: CategoryCardProps): ReactElement {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{name}</Typography>

              <ChevronRightIcon color="action" />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Chip
                label={type === "income" ? "Entrada" : "Saída"}
                color={type === "income" ? "success" : "error"}
                size="small"
              />

              <Chip
                label={isActive ? "Ativa" : "Inativa"}
                color={isActive ? "success" : "default"}
                variant="outlined"
                size="small"
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
