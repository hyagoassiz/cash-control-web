"use client";
import { AuthCard } from "@/components/AuthCard";
import { ControlledEmailField } from "@/components/ControlledEmailField";
import { ControlledPasswordField } from "@/components/ControlledPasswordField";
import { ControlledTextField } from "@/components/ControlledTextField";
import { useRegisterUserForm } from "@/modules/user/components/RegisterUserForm/hooks/useRegisterUserForm";
import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { type ReactElement } from "react";

export function RegisterUserForm(): ReactElement {
  const {
    registerUserForm,
    confirmarSenhaRules,
    emailRules,
    nomeRules,
    senhaRules,
    createUser,
  } = useRegisterUserForm();

  return (
    <AuthCard
      titulo="Criar conta"
      subtitulo="Use um e-mail válido e uma senha segura para começar a controlar o seu dinheiro."
    >
      <Stack spacing={2.5}>
        <ControlledTextField
          name="nome"
          control={registerUserForm.control}
          rules={nomeRules}
          label="Nome"
          placeholder="Seu nome"
          autoComplete="name"
        />

        <ControlledEmailField
          name="email"
          control={registerUserForm.control}
          rules={emailRules}
          label="E-mail"
          placeholder="seu@email.com"
          autoComplete="email"
        />

        <ControlledPasswordField
          name="senha"
          control={registerUserForm.control}
          rules={senhaRules}
          label="Senha"
          placeholder="Senha"
          autoComplete="password"
        />

        <ControlledPasswordField
          name="confirmarSenha"
          control={registerUserForm.control}
          rules={confirmarSenhaRules}
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
          disabled={registerUserForm.formState.isSubmitting}
          loading={registerUserForm.formState.isSubmitting}
          loadingPosition="center"
          onClick={createUser}
        >
          Criar Conta
        </LoadingButton>
      </Stack>

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
    </AuthCard>
  );
}
