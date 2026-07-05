"use client";
import { getMe } from "@/modules/user/services/userService";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
  }, [error]);

  if (isPending) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 5,
          px: 2,
          bgcolor: "#f7f8fc",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <p>Carregando...</p>
        </Box>
      </Box>
    );
  }

  return (
    <main>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 5,
          px: 2,
          bgcolor: "#f7f8fc",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>{children}</Box>
      </Box>
    </main>
  );
}
