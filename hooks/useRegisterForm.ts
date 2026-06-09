"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useForm,
  useWatch,
  type Control,
  type FieldPath,
  type RegisterOptions,
  type UseFormHandleSubmit,
} from "react-hook-form";
import { registerUser, type RegisterPayload } from "../lib/api/registerService";

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterFieldName = FieldPath<RegisterFormValues>;

export type RegisterFieldRules<TName extends RegisterFieldName> =
  RegisterOptions<RegisterFormValues, TName>;

export interface UseRegisterFormResult {
  control: Control<RegisterFormValues>;
  handleSubmit: UseFormHandleSubmit<RegisterFormValues>;
  isSubmitting: boolean;
  success: string | null;
  onSubmit: (data: RegisterFormValues) => Promise<void>;
  nameRules: RegisterFieldRules<"name">;
  emailRules: RegisterFieldRules<"email">;
  passwordRules: RegisterFieldRules<"password">;
  confirmPasswordRules: RegisterFieldRules<"confirmPassword">;
}

export function useRegisterForm(): UseRegisterFormResult {
  const router = useRouter();

  const [success, setSuccess] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control, name: "password", defaultValue: "" });

  const nameRules: RegisterFieldRules<"name"> = {
    required: "Nome completo é obrigatório",
    validate: {
      noEdges: (value) =>
        value === value.trim() || "Não pode ter espaço no começo ou fim",
      noDoubleSpaces: (value) =>
        !/\s{2,}/.test(value) || "Não pode haver espaços duplos",
    },
  };

  const emailRules: RegisterFieldRules<"email"> = {
    required: "E-mail é obrigatório",
    validate: {
      noEdges: (value) =>
        value === value.trim() || "Não pode ter espaço no começo ou fim",
      validFormat: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        "Formato de e-mail inválido",
    },
  };

  const passwordRules: RegisterFieldRules<"password"> = {
    required: "Senha é obrigatória",
    minLength: { value: 6, message: "Mínimo 6 caracteres" },
    validate: {
      noSpaces: (value) => !/\s/.test(value) || "Senha não pode conter espaços",
    },
  };

  const confirmPasswordRules: RegisterFieldRules<"confirmPassword"> = {
    required: "Confirmação é obrigatória",
    validate: {
      noSpaces: (value) => !/\s/.test(value) || "Senha não pode conter espaços",
      matches: (value) => value === password || "As senhas não conferem",
    },
  };

  async function onSubmit(data: RegisterFormValues): Promise<void> {
    const normalizedName = data.name.trim();
    const payload: RegisterPayload = {
      name: normalizedName,
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    setSuccess(null);
    const response = await registerUser(payload);
    reset();
    setSuccess(response.message);
    window.setTimeout(() => router.push("/login"), 1600);
  }

  return {
    control,
    handleSubmit,
    isSubmitting,
    success,
    onSubmit,
    nameRules,
    emailRules,
    passwordRules,
    confirmPasswordRules,
  };
}
