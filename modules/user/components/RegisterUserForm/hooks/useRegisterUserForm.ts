"use client";

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import {
  RegisterFormValues,
  registerSchema,
} from "@/modules/user/components/RegisterUserForm/schema/registerSchema";
import { UserRequestDTO, UserResponseDTO } from "@/modules/user/dto/userDto";
import { postUser } from "@/modules/user/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

type RegisterUserFormValues = UserRequestDTO & {
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
    createUser,
  };
}
