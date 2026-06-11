"use client";
import { CardAutenticacao } from "@/components/CardAutenticacao";
import { ControlledEmailField } from "@/components/ControlledEmailField";
import { ControlledPasswordField } from "@/components/ControlledPasswordField";
import { ControlledTextField } from "@/components/ControlledTextField";
import { useCadastroUsuarioForm } from "@/modules/usuario/components/CadastroUsuarioForm/hooks/useCadastroUsuarioForm";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { type ReactElement } from "react";

export function CadastroUsuarioForm(): ReactElement {
  const {
    control,
    handleSubmit,
    isSubmitting,
    onSubmit,
    nameRules,
    emailRules,
    passwordRules,
    confirmPasswordRules,
  } = useCadastroUsuarioForm();

  return (
    <CardAutenticacao
      titulo="Criar conta"
      subtitulo="Use um e-mail válido e uma senha segura para começar a controlar o seu dinheiro."
    >
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

          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1, py: 1.5, textTransform: "none", fontWeight: 700 }}
            size="large"
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingPosition="center"
          >
            Criar Conta
          </LoadingButton>
        </Stack>
      </Box>

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
    </CardAutenticacao>
  );
}
