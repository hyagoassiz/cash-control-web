"use client";
import { CardAutenticacao } from "@/components/CardAutenticacao";
import { ControlledEmailField } from "@/components/ControlledEmailField";
import { ControlledPasswordField } from "@/components/ControlledPasswordField";
import { useLoginUsuarioForm } from "@/modules/usuario/components/LoginUsuarioForm/hooks/useLoginUsuarioForm";
import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { type ReactElement } from "react";

export function LoginUsuarioForm(): ReactElement {
  const { loginUsuarioForm, emailRules, senhaRules, login } =
    useLoginUsuarioForm();

  return (
    <CardAutenticacao
      titulo="Login"
      subtitulo="Entre com seu e-mail e senha para continuar."
    >
      <Stack spacing={2.5}>
        <ControlledEmailField
          name="email"
          control={loginUsuarioForm.control}
          rules={emailRules}
          label="E-mail"
          placeholder="seu@email.com"
          autoComplete="email"
        />

        <ControlledPasswordField
          name="senha"
          control={loginUsuarioForm.control}
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
          disabled={loginUsuarioForm.formState.isSubmitting}
          loading={loginUsuarioForm.formState.isSubmitting}
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
          href="/cadastro"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Criar conta
        </Link>
      </Typography>
    </CardAutenticacao>
  );
}
