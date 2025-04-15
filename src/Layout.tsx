import { ReactNode } from "react";
import { Layout as RALayout } from "react-admin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const customTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1E1E2F", // Sidebar background color (Dark)
          color: "#FFF", // Sidebar text color (White)
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.RaMenuItemLink-active": {
            backgroundColor: "#444B6E !important", // Active menu background
          },
          "&:hover": {
            backgroundColor: "#555A7A", // Hover effect
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#000 !important", // Black icons ✅
        },
      },
    },
  },
});

export const Layout = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <RALayout>{children}</RALayout>
  </ThemeProvider>
);
