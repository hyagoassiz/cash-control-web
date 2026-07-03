"use client";

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import { UserRequestDTO, UserResponseDTO } from "@/modules/user/dto/userDto";
import { postUser } from "@/modules/user/services/userService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  useForm,
  UseFormReturn,
  useWatch,
  type FieldPath,
  type RegisterOptions,
} from "react-hook-form";

type RegisterUserFormValues = UserRequestDTO & {
  confirmPassword: string;
};

type RegisterFieldName = FieldPath<RegisterUserFormValues>;

type RegisterFieldRules<TName extends RegisterFieldName> = RegisterOptions<
  RegisterUserFormValues,
  TName
>;

interface UseRegisterUserFormReturn {
  registerUserForm: UseFormReturn<RegisterUserFormValues>;
  confirmPasswordRules: RegisterFieldRules<"confirmPassword">;
  emailRules: RegisterFieldRules<"email">;
  nameRules: RegisterFieldRules<"name">;
  passwordRules: RegisterFieldRules<"password">;
  createUser(): void;
}

export function useRegisterUserForm(): UseRegisterUserFormReturn {
  const router = useRouter();

  const registerUserForm = useForm<RegisterUserFormValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutationPostUsuario = useMutation<
    UserResponseDTO,
    ApiErrorResponse,
    UserRequestDTO
  >({
    mutationFn: postUser,
    onSuccess: () => {
      registerUserForm.reset();

      window.setTimeout(() => router.push("/login"), 1000);
    },
    onError: (error) => {
      error.errors.forEach((item) => {
        registerUserForm.setError(item.field as keyof RegisterUserFormValues, {
          message: item.message,
        });
      });
    },
  });

  const password = useWatch({
    control: registerUserForm.control,
    name: "password",
    defaultValue: "",
  });

  const nameRules: RegisterFieldRules<"name"> = {
    required: "Nome é obrigatório",
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
    },
  };

  const passwordRules: RegisterFieldRules<"password"> = {
    required: "Senha é obrigatória",
  };

  const confirmPasswordRules: RegisterFieldRules<"confirmPassword"> = {
    required: "Confirmar Senha é obrigatória",
    validate: {
      matches: (value) => value === password || "As senhas não conferem",
    },
  };

  function createUser(): void {
    registerUserForm.handleSubmit(async ({ name, email, password }) => {
      const payload: UserRequestDTO = {
        name,
        email,
        password,
      };

      mutationPostUsuario.mutate(payload);
    })();
  }

  return {
    registerUserForm,
    confirmPasswordRules,
    emailRules,
    nameRules,
    passwordRules,
    createUser,
  };
}
