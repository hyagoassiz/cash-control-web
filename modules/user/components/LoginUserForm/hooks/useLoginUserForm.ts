"use client";

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import { LoginRequestDTO, LoginResponseDTO } from "@/modules/user/dto/loginDto";
import { UserRequestDTO } from "@/modules/user/dto/userDto";
import { postLoginUsuario } from "@/modules/user/services/userService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  useForm,
  UseFormReturn,
  type FieldPath,
  type RegisterOptions,
} from "react-hook-form";

type LoginUserFormValues = UserRequestDTO & {
  confirmarSenha: string;
};

type RegisterFieldName = FieldPath<LoginUserFormValues>;

type RegisterFieldRules<TName extends RegisterFieldName> = RegisterOptions<
  LoginUserFormValues,
  TName
>;

interface UseLoginUserFormReturn {
  loginUserForm: UseFormReturn<LoginUserFormValues>;
  emailRules: RegisterFieldRules<"email">;
  senhaRules: RegisterFieldRules<"senha">;
  login(): void;
}

export function useLoginUserForm(): UseLoginUserFormReturn {
  const router = useRouter();

  const loginUserForm = useForm<LoginUserFormValues>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const mutationPostLoginUsuario = useMutation<
    LoginResponseDTO,
    ApiErrorResponse,
    LoginRequestDTO
  >({
    mutationFn: postLoginUsuario,
    onSuccess: () => {
      loginUserForm.reset();

      window.setTimeout(() => router.push("/login"), 1000);
    },
    onError: (error) => {
      error.errors.forEach((item) => {
        loginUserForm.setError(item.field as keyof LoginUserFormValues, {
          message: item.message,
        });
      });
    },
  });

  const emailRules: RegisterFieldRules<"email"> = {
    required: "E-mail é obrigatório",
    validate: {
      noEdges: (value) =>
        value === value.trim() || "Não pode ter espaço no começo ou fim",
    },
  };

  const senhaRules: RegisterFieldRules<"senha"> = {
    required: "Senha é obrigatória",
  };

  function login(): void {
    loginUserForm.handleSubmit(async ({ email, senha }) => {
      const payload: LoginRequestDTO = {
        email,
        senha,
      };

      mutationPostLoginUsuario.mutate(payload);
    })();
  }

  return {
    loginUserForm,
    emailRules,
    senhaRules,
    login,
  };
}
