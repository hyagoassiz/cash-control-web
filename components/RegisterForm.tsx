"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onTouched" });
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setSuccess(null);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSuccess("Conta criada com sucesso.");
    console.log("submit", { name: data.name, email: data.email });
  };

  const password = useWatch({ control, name: "password", defaultValue: "" });

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        elevation={0}
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, lineHeight: 1.6 }}
          >
            Comece a organizar suas finanças hoje mesmo.
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              <TextField
                label="Nome completo"
                placeholder="Seu nome"
                fullWidth
                autoComplete="name"
                {...register("name", {
                  required: "Nome completo é obrigatório",
                })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                InputProps={{ sx: { minHeight: 48, px: 1.25 } }}
              />

              <TextField
                label="E-mail"
                placeholder="seu@email.com"
                type="email"
                fullWidth
                autoComplete="email"
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de e-mail inválido",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                InputProps={{ sx: { minHeight: 48, px: 1.25 } }}
              />

              <TextField
                label="Senha"
                placeholder="Senha"
                type="password"
                fullWidth
                autoComplete="new-password"
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                InputProps={{ sx: { minHeight: 48, px: 1.25 } }}
              />

              <TextField
                label="Confirmar senha"
                placeholder="Repita a senha"
                type="password"
                fullWidth
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Confirmação é obrigatória",
                  validate: (value) =>
                    value === password || "As senhas não conferem",
                })}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                InputProps={{ sx: { minHeight: 48, px: 1.25 } }}
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

          {success && (
            <Typography
              variant="body2"
              color="success.main"
              sx={{ mt: 3, textAlign: "center" }}
            >
              {success}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
