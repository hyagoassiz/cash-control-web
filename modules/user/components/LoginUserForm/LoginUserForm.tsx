"use client";
import { ControlledEmailField } from "@/components/ControlledEmailField";
import { ControlledPasswordField } from "@/components/ControlledPasswordField";
import AuthActions from "@/modules/user/components/AuthActions/AuthActions";
import { AuthLayout } from "@/modules/user/components/AuthLayout";
import { useLoginUserForm } from "@/modules/user/components/LoginUserForm/hooks/useLoginUserForm";
import { Checkbox, FormControlLabel } from "@mui/material";
import { type ReactElement } from "react";
import { Controller } from "react-hook-form";

export function LoginUserForm(): ReactElement {
  const { isLoading, loginUserForm, login } = useLoginUserForm();

  return (
    <AuthLayout titleRoute="Login">
      <ControlledEmailField
        name="email"
        control={loginUserForm.control}
        label="E-mail"
        placeholder="seu-email@email.com"
        autoComplete="email"
        fullWidth
        required
      />

      <ControlledPasswordField
        name="password"
        control={loginUserForm.control}
        label="Senha"
        placeholder="Senha"
        autoComplete="password"
        fullWidth
        required
      />

      <Controller
        name="rememberEmail"
        control={loginUserForm.control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value ?? false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label="Lembrar de mim"
          />
        )}
      />

      <AuthActions
        linkHref="/register"
        isLoading={isLoading}
        buttonLabel="Entrar"
        linkLabel="Criar conta"
        linkDescription="Ainda não possui uma conta?"
        onClick={login}
      />
    </AuthLayout>
  );
}
