"use client";

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import {
  LoginRequestDTO,
  LoginResponseDTO,
} from "@/modules/usuario/dto/loginDto";
import { UsuarioRequestDTO } from "@/modules/usuario/dto/usuarioDto";
import { postLoginUsuario } from "@/modules/usuario/services/usuarioService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  useForm,
  UseFormReturn,
  type FieldPath,
  type RegisterOptions,
} from "react-hook-form";

type LoginUsuarioForm = UsuarioRequestDTO & {
  confirmarSenha: string;
};

type RegisterFieldName = FieldPath<LoginUsuarioForm>;

type RegisterFieldRules<TName extends RegisterFieldName> = RegisterOptions<
  LoginUsuarioForm,
  TName
>;

interface UseLoginUsuarioFormReturn {
  loginUsuarioForm: UseFormReturn<LoginUsuarioForm>;
  emailRules: RegisterFieldRules<"email">;
  senhaRules: RegisterFieldRules<"senha">;
  login(): void;
}

export function useLoginUsuarioForm(): UseLoginUsuarioFormReturn {
  const router = useRouter();

  const loginUsuarioForm = useForm<LoginUsuarioForm>({
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
      loginUsuarioForm.reset();

      window.setTimeout(() => router.push("/login"), 1000);
    },
    onError: (error) => {
      error.errors.forEach((item) => {
        loginUsuarioForm.setError(item.field as keyof LoginUsuarioForm, {
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
    loginUsuarioForm.handleSubmit(async ({ email, senha }) => {
      const payload: LoginRequestDTO = {
        email,
        senha,
      };

      mutationPostLoginUsuario.mutate(payload);
    })();
  }

  return {
    loginUsuarioForm,
    emailRules,
    senhaRules,
    login,
  };
}
