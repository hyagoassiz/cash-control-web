"use client";

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import {
  LoginFormValues,
  loginSchema,
} from "@/modules/user/components/LoginUserForm/schema/loginSchema";
import { LoginRequestDTO, LoginResponseDTO } from "@/modules/user/dto/loginDto";
import { postUserLogin } from "@/modules/user/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseLoginUserFormReturn {
  loginUserForm: UseFormReturn<LoginFormValues>;
  login(): void;
}

export function useLoginUserForm(): UseLoginUserFormReturn {
  const router = useRouter();

  const loginUserForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutationPostLoginUsuario = useMutation<
    LoginResponseDTO,
    ApiErrorResponse,
    LoginRequestDTO
  >({
    mutationFn: postUserLogin,
    onSuccess: () => {
      loginUserForm.reset();

      window.setTimeout(() => router.push("/dashboard"), 1000);
    },
    onError: (error) => {
      error?.errors?.forEach((item) => {
        loginUserForm.setError(item.field as keyof LoginFormValues, {
          message: item.message,
        });
      });
    },
  });

  function login(): void {
    loginUserForm.handleSubmit(async ({ email, password }) => {
      const payload: LoginRequestDTO = {
        email,
        password,
      };

      mutationPostLoginUsuario.mutate(payload);
    })();
  }

  return {
    loginUserForm,
    login,
  };
}
