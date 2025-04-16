// components/resources/LandingPage.tsx
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Stack } from "@mui/material";
import logo from "../odiigo_logo.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="Odiigo Logo"
        sx={{
          maxWidth: "180px",
          marginBottom: 3,
        }}
      />

      {/* Main Title */}
      <Typography
        variant="h3"
        component="h1"
        sx={{
          color: "#2A6887",
          fontWeight: "bold",
          marginBottom: 1,
          textAlign: "center",
        }}
      >
        Welcome to the Odiigo Admin Panel
      </Typography>

      {/* Tagline */}
      <Typography
        variant="h6"
        sx={{
          color: "#4FDBC4",
          marginBottom: 3,
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Repairs With Trust & Care
      </Typography>

      {/* Extra Details */}
      <Stack spacing={1} sx={{ maxWidth: "600px", textAlign: "center", marginBottom: 5 }}>
        <Typography variant="body1" sx={{ color: "#333" }}>
          Easily onboard garages, add service offerings, assign car models, and maintain a seamless workflow across your service network.
        </Typography>
        <Typography variant="body1" sx={{ color: "#333" }}>
          Built for efficiency, scalability, and total control.
        </Typography>
      </Stack>

      {/* CTA Button */}
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/admin-login")}
        sx={{
          backgroundColor: "#2A6887",
          color: "#fff",
          fontWeight: "bold",
          paddingX: 4,
          paddingY: 1.5,
          fontSize: "1rem",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "#245b73",
          },
        }}
      >
        Go to Admin Login
      </Button>
    </Box>
  );
}
