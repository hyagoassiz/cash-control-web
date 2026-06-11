"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ReactNode, type ReactElement } from "react";

interface CardAutenticacaoProps {
  children: ReactNode;
  titulo: string;
  subtitulo: string;
}

export function CardAutenticacao({
  children,
  titulo,
  subtitulo,
}: CardAutenticacaoProps): ReactElement {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        elevation={1}
        sx={{
          mx: "auto",
          width: "100%",
          borderRadius: 3,
          border: "1px solid rgba(15, 23, 42, 0.08)",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            {titulo}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {subtitulo}
          </Typography>

          {children}
        </Box>
      </Paper>
    </Box>
  );
}
