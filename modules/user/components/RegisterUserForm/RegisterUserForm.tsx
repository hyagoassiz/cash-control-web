"use client";
import { ControlledEmailField } from "@/components/ControlledEmailField";
import { ControlledPasswordField } from "@/components/ControlledPasswordField";
import { ControlledTextField } from "@/components/ControlledTextField";
import AuthActions from "@/modules/user/components/AuthActions/AuthActions";
import { AuthLayout } from "@/modules/user/components/AuthLayout";
import { useRegisterUserForm } from "@/modules/user/components/RegisterUserForm/hooks/useRegisterUserForm";
import { type ReactElement } from "react";

export function RegisterUserForm(): ReactElement {
  const { registerUserForm, createUser } = useRegisterUserForm();

  return (
    <AuthLayout titleRoute="Criar Conta">
      <ControlledTextField
        name="name"
        control={registerUserForm.control}
        label="Nome"
        placeholder="Seu nome"
        autoComplete="name"
        fullWidth
        required
      />

      <ControlledEmailField
        name="email"
        control={registerUserForm.control}
        label="E-mail"
        placeholder="seu@email.com"
        autoComplete="email"
        fullWidth
        required
      />

      <ControlledPasswordField
        name="password"
        control={registerUserForm.control}
        label="Senha"
        placeholder="Senha"
        autoComplete="password"
        fullWidth
        required
      />

      <ControlledPasswordField
        name="confirmPassword"
        control={registerUserForm.control}
        label="Confirmar Senha"
        placeholder="Repita a password"
        autoComplete="new-password"
        fullWidth
        required
      />

      <AuthActions
        linkHref="/login"
        isLoading={registerUserForm.formState.isSubmitting}
        buttonLabel="Criar Conta"
        linkLabel="Entrar"
        linkDescription="Já possui uma conta?"
        onClick={createUser}
      />
    </AuthLayout>
  );
}
