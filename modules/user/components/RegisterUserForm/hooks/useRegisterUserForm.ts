"use client";

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import { UserRequestDTO, UserResponseDTO } from "@/modules/user/dto/userDto";
import { postUsuario } from "@/modules/user/services/userService";
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
  confirmarSenha: string;
};

type RegisterFieldName = FieldPath<RegisterUserFormValues>;

type RegisterFieldRules<TName extends RegisterFieldName> = RegisterOptions<
  RegisterUserFormValues,
  TName
>;

interface UseRegisterUserFormReturn {
  registerUserForm: UseFormReturn<RegisterUserFormValues>;
  confirmarSenhaRules: RegisterFieldRules<"confirmarSenha">;
  emailRules: RegisterFieldRules<"email">;
  nomeRules: RegisterFieldRules<"nome">;
  senhaRules: RegisterFieldRules<"senha">;
  createUser(): void;
}

export function useRegisterUserForm(): UseRegisterUserFormReturn {
  const router = useRouter();

  const registerUserForm = useForm<RegisterUserFormValues>({
    mode: "onTouched",
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const mutationPostUsuario = useMutation<
    UserResponseDTO,
    ApiErrorResponse,
    UserRequestDTO
  >({
    mutationFn: postUsuario,
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

  const senha = useWatch({
    control: registerUserForm.control,
    name: "senha",
    defaultValue: "",
  });

  const nomeRules: RegisterFieldRules<"nome"> = {
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

  const senhaRules: RegisterFieldRules<"senha"> = {
    required: "Senha é obrigatória",
  };

  const confirmarSenhaRules: RegisterFieldRules<"confirmarSenha"> = {
    required: "Confirmar Senha é obrigatória",
    validate: {
      matches: (value) => value === senha || "As senhas não conferem",
    },
  };

  function createUser(): void {
    registerUserForm.handleSubmit(async ({ nome, email, senha }) => {
      const payload: UserRequestDTO = {
        nome,
        email,
        senha,
      };

      mutationPostUsuario.mutate(payload);
    })();
  }

  return {
    registerUserForm,
    confirmarSenhaRules,
    emailRules,
    nomeRules,
    senhaRules,
    createUser,
  };
}
