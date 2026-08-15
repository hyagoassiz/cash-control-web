"use client";

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import {
  RegisterFormValues,
  registerSchema,
} from "@/modules/user/components/RegisterUserForm/schema/registerSchema";
import { postUser } from "@/modules/user/services/userService";
import {
  CreateUserRequestDTO,
  UserResponseDTO,
} from "@/modules/user/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

type RegisterUserFormValues = CreateUserRequestDTO & {
  confirmPassword: string;
};

interface UseRegisterUserFormReturn {
  registerUserForm: UseFormReturn<RegisterFormValues>;
  createUser(): void;
}

export function useRegisterUserForm(): UseRegisterUserFormReturn {
  const router = useRouter();

  const registerUserForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
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
    CreateUserRequestDTO
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

  function createUser(): void {
    registerUserForm.handleSubmit(async ({ name, email, password }) => {
      const payload: CreateUserRequestDTO = {
        name,
        email,
        password,
      };

      mutationPostUsuario.mutate(payload);
    })();
  }

  return {
    registerUserForm,
    createUser,
  };
}
