"use client";

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import { LoginRequestDTO, LoginResponseDTO } from "@/modules/user/dto/loginDto";
import { UserRequestDTO } from "@/modules/user/dto/userDto";
import { postUserLogin } from "@/modules/user/services/userService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

type LoginUserFormValues = UserRequestDTO & {
  confirmPassword: string;
  rememberEmail: boolean;
};

interface UseLoginUserFormReturn {
  loginUserForm: UseFormReturn<LoginUserFormValues>;
  login(): void;
}

export function useLoginUserForm(): UseLoginUserFormReturn {
  const router = useRouter();

  const loginUserForm = useForm<LoginUserFormValues>({
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
        loginUserForm.setError(item.field as keyof LoginUserFormValues, {
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
