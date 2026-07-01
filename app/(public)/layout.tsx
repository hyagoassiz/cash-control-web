import { Box, Typography } from "@mui/material";

export default function LayoutPublico({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="button"
              sx={{ letterSpacing: 2, fontWeight: 700, color: "text.primary" }}
            >
              Cash Control
            </Typography>
          </Box>

          {children}
        </Box>
      </Box>
    </main>
  );
}
