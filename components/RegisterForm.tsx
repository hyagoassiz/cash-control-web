"use client";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import { Controller } from "react-hook-form";
import { useRegisterForm } from "../hooks/useRegisterForm";

function preventSpaceTyping(event: KeyboardEvent<HTMLInputElement>): void {
  if (event.key === " ") {
    event.preventDefault();
  }
}

function sanitizeNoSpacesPaste(event: ClipboardEvent<HTMLInputElement>): void {
  const pastedText = event.clipboardData.getData("text");
  if (!/\s/.test(pastedText)) {
    return;
  }

  event.preventDefault();
  const sanitized = pastedText.replace(/\s+/g, "");
  const target = event.target as HTMLInputElement;
  const start = target.selectionStart ?? 0;
  const end = target.selectionEnd ?? 0;
  const value = target.value;
  const newValue = value.slice(0, start) + sanitized + value.slice(end);
  target.value = newValue;
  target.dispatchEvent(new Event("input", { bubbles: true }));
}

function preventDoubleNameSpace(event: KeyboardEvent<HTMLInputElement>): void {
  if (event.key !== " ") {
    return;
  }
  const target = event.target as HTMLInputElement;
  const position = target.selectionStart ?? 0;
  if (position === 0) {
    event.preventDefault();
    return;
  }

  if (target.value.charAt(position - 1) === " ") {
    event.preventDefault();
  }
}

function sanitizeNamePaste(event: ClipboardEvent<HTMLInputElement>): void {
  const pastedText = event.clipboardData.getData("text");
  const sanitized = pastedText.replace(/\s+/g, " ").trim();
  if (sanitized === pastedText) {
    return;
  }

  event.preventDefault();
  const target = event.target as HTMLInputElement;
  const start = target.selectionStart ?? 0;
  const end = target.selectionEnd ?? 0;
  const value = target.value;
  const newValue = value.slice(0, start) + sanitized + value.slice(end);
  target.value = newValue;
  target.dispatchEvent(new Event("input", { bubbles: true }));
}

export default function RegisterForm(): ReactElement {
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
  } = useRegisterForm();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              <Controller
                name="name"
                control={control}
                rules={nameRules}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Nome completo"
                    placeholder="Seu nome"
                    fullWidth
                    autoComplete="name"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || ""}
                    InputProps={{ sx: { minHeight: 48, px: 1.25 } }}
                    inputProps={{
                      onKeyDown: preventDoubleNameSpace,
                      onPaste: sanitizeNamePaste,
                    }}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={emailRules}
                render={({ field, fieldState }) => (
                  <TextField
                    label="E-mail"
                    placeholder="seu@email.com"
                    type="email"
                    fullWidth
                    autoComplete="email"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || ""}
                    InputProps={{ sx: { minHeight: 48, px: 1.25 } }}
                    inputProps={{
                      onKeyDown: preventSpaceTyping,
                      onPaste: sanitizeNoSpacesPaste,
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={passwordRules}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Senha"
                    placeholder="Senha"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    autoComplete="new-password"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || ""}
                    InputProps={{
                      sx: { minHeight: 48, px: 1.25 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? "Ocultar senha" : "Mostrar senha"
                            }
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      onKeyDown: preventSpaceTyping,
                      onPaste: sanitizeNoSpacesPaste,
                    }}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                rules={confirmPasswordRules}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Confirmar senha"
                    placeholder="Repita a senha"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    autoComplete="new-password"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || ""}
                    InputProps={{
                      sx: { minHeight: 48, px: 1.25 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showConfirmPassword
                                ? "Ocultar senha"
                                : "Mostrar senha"
                            }
                            edge="end"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      onKeyDown: preventSpaceTyping,
                      onPaste: sanitizeNoSpacesPaste,
                    }}
                  />
                )}
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
