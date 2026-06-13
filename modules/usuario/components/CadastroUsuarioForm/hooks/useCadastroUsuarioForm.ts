"use client";

import {
  UsuarioRequestDTO,
  UsuarioResponseDTO,
} from "@/modules/usuario/dto/usuarioDto";
import { postUsuarios } from "@/modules/usuario/services/usuarioService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  useForm,
  UseFormReturn,
  useWatch,
  type FieldPath,
  type RegisterOptions,
} from "react-hook-form";

type CadastroUsuarioForm = UsuarioRequestDTO & {
  confirmarSenha: string;
};

type RegisterFieldName = FieldPath<CadastroUsuarioForm>;

type RegisterFieldRules<TName extends RegisterFieldName> = RegisterOptions<
  CadastroUsuarioForm,
  TName
>;

interface UseCadastroUsuarioFormReturn {
  cadastroUsuarioForm: UseFormReturn<CadastroUsuarioForm>;
  confirmarSenhaRules: RegisterFieldRules<"confirmarSenha">;
  emailRules: RegisterFieldRules<"email">;
  nomeRules: RegisterFieldRules<"nome">;
  senhaRules: RegisterFieldRules<"senha">;
  criarUsuario(): void;
}

export function useCadastroUsuarioForm(): UseCadastroUsuarioFormReturn {
  const router = useRouter();

  const cadastroUsuarioForm = useForm<CadastroUsuarioForm>({
    mode: "onTouched",
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const mutationPostUsuarios = useMutation<
    UsuarioResponseDTO,
    Error,
    UsuarioRequestDTO
  >({
    mutationFn: postUsuarios,
    onSuccess: () => {
      cadastroUsuarioForm.reset();

      window.setTimeout(() => router.push("/login"), 1000);
    },
  });

  const senha = useWatch({
    control: cadastroUsuarioForm.control,
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
      validFormat: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        "Formato de e-mail inválido",
    },
  };

  const senhaRules: RegisterFieldRules<"senha"> = {
    required: "Senha é obrigatória",
    minLength: { value: 8, message: "Mínimo 8 caracteres" },
    maxLength: { value: 60, message: "Máximo 60 caracteres" },
  };

  const confirmarSenhaRules: RegisterFieldRules<"confirmarSenha"> = {
    required: "Confirmar Senha é obrigatória",
    validate: {
      matches: (value) => value === senha || "As senhas não conferem",
    },
  };

  function criarUsuario(): void {
    cadastroUsuarioForm.handleSubmit(async ({ nome, email, senha }) => {
      const payload: UsuarioRequestDTO = {
        nome,
        email,
        senha,
      };

      mutationPostUsuarios.mutate(payload);
    })();
  }

  return {
    cadastroUsuarioForm,
    confirmarSenhaRules,
    emailRules,
    nomeRules,
    senhaRules,
    criarUsuario,
  };
}
