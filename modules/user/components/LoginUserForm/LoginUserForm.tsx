"use client";
import { ControlledEmailField } from "@/components/ControlledEmailField";
import { ControlledPasswordField } from "@/components/ControlledPasswordField";
import { AuthLayout } from "@/modules/user/components/AuthLayout";
import { useLoginUserForm } from "@/modules/user/components/LoginUserForm/hooks/useLoginUserForm";
import { LoadingButton } from "@mui/lab";
import { Checkbox, FormControlLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { type ReactElement } from "react";
import { Controller } from "react-hook-form";

export function LoginUserForm(): ReactElement {
  const { loginUserForm, login } = useLoginUserForm();

  return (
    <AuthLayout titleRoute="Login" onKeyDown={login}>
      <ControlledEmailField
        name="email"
        control={loginUserForm.control}
        label="E-mail"
        placeholder="seu@email.com"
        autoComplete="email"
        fullWidth
      />

      <ControlledPasswordField
        name="password"
        control={loginUserForm.control}
        label="Senha"
        placeholder="Senha"
        autoComplete="password"
        fullWidth
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

      <LoadingButton
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 1, py: 1.5, textTransform: "none", fontWeight: 700 }}
        size="large"
        disabled={loginUserForm.formState.isSubmitting}
        loading={loginUserForm.formState.isSubmitting}
        loadingPosition="center"
        onClick={login}
      >
        Entrar
      </LoadingButton>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 3, textAlign: "center" }}
      >
        Ainda não possui uma conta?{" "}
        <Link
          href="/register"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Criar conta
        </Link>
      </Typography>
    </AuthLayout>
  );
}
