"use client";
import { ControlledEmailField } from "@/components/ControlledEmailField";
import { ControlledPasswordField } from "@/components/ControlledPasswordField";
import { ControlledTextField } from "@/components/ControlledTextField";
import { AuthLayout } from "@/modules/user/components/AuthLayout";
import { useRegisterUserForm } from "@/modules/user/components/RegisterUserForm/hooks/useRegisterUserForm";
import { LoadingButton } from "@mui/lab";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { type ReactElement } from "react";

export function RegisterUserForm(): ReactElement {
  const {
    registerUserForm,
    confirmPasswordRules,
    emailRules,
    nameRules,
    passwordRules,
    createUser,
  } = useRegisterUserForm();

  return (
    <AuthLayout titleRoute="Criar Conta" onKeyDown={createUser}>
      <ControlledTextField
        name="name"
        control={registerUserForm.control}
        rules={nameRules}
        label="Nome"
        placeholder="Seu name"
        autoComplete="name"
        fullWidth
      />

      <ControlledEmailField
        name="email"
        control={registerUserForm.control}
        rules={emailRules}
        label="E-mail"
        placeholder="seu@email.com"
        autoComplete="email"
        fullWidth
      />

      <ControlledPasswordField
        name="password"
        control={registerUserForm.control}
        rules={passwordRules}
        label="Senha"
        placeholder="Senha"
        autoComplete="password"
        fullWidth
      />

      <ControlledPasswordField
        name="confirmPassword"
        control={registerUserForm.control}
        rules={confirmPasswordRules}
        label="Confirmar Senha"
        placeholder="Repita a password"
        autoComplete="new-password"
        fullWidth
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
    </AuthLayout>
  );
}
