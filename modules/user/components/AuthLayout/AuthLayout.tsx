import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  titleRoute: string;
  onKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  titleRoute,
  onKeyDown,
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Grid
          item
          md={6}
          sx={{
            // backgroundImage: `url(${gestorImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={theme.palette.primary.dark}
      >
        <Box
          onKeyDown={onKeyDown}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "auto",
              width: "350px",
              boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
              backgroundColor: theme.palette.primary.contrastText,
              borderRadius: theme.shape.borderRadius,
              padding: theme.spacing(4),
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontWeight: 600,
                alignSelf: "flex-start",
                color: theme.palette.text.primary,
              }}
            >
              {titleRoute}
            </Typography>

            <Grid container gap={2} sx={{ marginTop: "24px" }}>
              {children}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
