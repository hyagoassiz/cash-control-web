"use client";
import { ControlledEmailField } from "@/components/ControlledEmailField";
import { ControlledPasswordField } from "@/components/ControlledPasswordField";
import { ControlledTextField } from "@/components/ControlledTextField";
import { useCadastroUsuarioForm } from "@/modules/usuario/components/CadastroUsuarioForm/hooks/useCadastroUsuarioForm";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { type ReactElement } from "react";

export function CadastroUsuarioForm(): ReactElement {
  const {
    control,
    handleSubmit,
    isSubmitting,
    success,
    onSubmit,
    nameRules,
    emailRules,
    passwordRules,
    confirmPasswordRules,
  } = useCadastroUsuarioForm();

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
            Criar conta
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Use um e-mail válido e uma senha segura para começar a controlar o
            seu dinheiro.
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              <ControlledTextField
                name="name"
                control={control}
                rules={nameRules}
                label="Nome"
                placeholder="Seu nome"
                autoComplete="name"
              />

              <ControlledEmailField
                name="email"
                control={control}
                rules={emailRules}
                label="E-mail"
                placeholder="seu@email.com"
                autoComplete="email"
              />

              <ControlledPasswordField
                name="password"
                control={control}
                rules={passwordRules}
                label="Senha"
                placeholder="Senha"
                autoComplete="password"
              />

              <ControlledPasswordField
                name="confirmPassword"
                control={control}
                rules={confirmPasswordRules}
                label="Confirmar Senha"
                placeholder="Repita a senha"
                autoComplete="new-password"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 1, py: 1.5, textTransform: "none", fontWeight: 700 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Criando conta..." : "Criar conta"}
              </Button>
            </Stack>
          </Box>

          {success ? (
            <Alert severity="success" sx={{ mt: 3 }}>
              {success} Em instantes você será redirecionado para login.
            </Alert>
          ) : null}

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 3, textAlign: "center" }}
          >
            Já possui uma conta?{" "}
            <Link
              href="/login"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Entrar
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
