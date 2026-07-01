"use client";
import { AuthCard } from "@/components/AuthCard";
import { ControlledEmailField } from "@/components/ControlledEmailField";
import { ControlledPasswordField } from "@/components/ControlledPasswordField";
import { useLoginUserForm } from "@/modules/user/components/LoginUserForm/hooks/useLoginUserForm";
import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { type ReactElement } from "react";

export function LoginUserForm(): ReactElement {
  const { loginUserForm, emailRules, senhaRules, login } = useLoginUserForm();

  return (
    <AuthCard
      titulo="Login"
      subtitulo="Entre com seu e-mail e senha para continuar."
    >
      <Stack spacing={2.5}>
        <ControlledEmailField
          name="email"
          control={loginUserForm.control}
          rules={emailRules}
          label="E-mail"
          placeholder="seu@email.com"
          autoComplete="email"
        />

        <ControlledPasswordField
          name="senha"
          control={loginUserForm.control}
          rules={senhaRules}
          label="Senha"
          placeholder="Senha"
          autoComplete="password"
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
      </Stack>

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
    </AuthCard>
  );
}
