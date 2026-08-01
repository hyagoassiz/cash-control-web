"use client";
import { getMe } from "@/modules/user/services/userService";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LeftDrawer, { DrawerGroup } from "../../components/LeftDrawer";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const groups: DrawerGroup[] = [
    {
      title: "",
      options: [{ label: "Dashboard", href: "/dashboard" }],
    },
    {
      title: "Financeiro",
      options: [{ label: "Categorias", href: "/categories" }],
    },
    {
      title: "Configurações",
      options: [
        { label: "Perfil", href: "/profile" },
        { label: "Sair", onClick: () => console.log("logout") },
      ],
    },
  ];

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
    <>
      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Cash Control
          </Typography>
        </Toolbar>
      </AppBar>

      <LeftDrawer
        open={open}
        onClose={() => setOpen(false)}
        siteName="Cash Control"
        groups={groups}
      />

      <Toolbar />

      <main>
        <Box
          sx={{
            minHeight: "calc(100vh - 64px)",
            p: 3,
            bgcolor: "#f7f8fc",
          }}
        >
          {children}
        </Box>
      </main>
    </>
  );
}
