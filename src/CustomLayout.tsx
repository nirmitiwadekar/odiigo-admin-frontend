import { ReactNode } from "react";
import { 
  Layout, 
  AppBar, 
  useGetIdentity
} from "react-admin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Typography, Box } from "@mui/material";
// import {AccountCircleIcon, Avatar} from '@mui/icons-material/AccountCircle';

const customTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1E1E2F",
          color: "#FFF",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(180deg, #4FDBC4 0%, #2A6887 100%)',
          color: "#FFF",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.RaMenuItemLink-active": {
            backgroundColor: "#444B6E !important",
          },
          "&:hover": {
            backgroundColor: "#555A7A",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "black !important", // White icons to be visible on dark background
        },
      },
    },
  },
});

// Custom AppBar with admin info and logout button
const CustomAppBar = () => {
  const { identity } = useGetIdentity();
  const adminName = identity?.fullName || identity?.name || 'Admin';

  return (
    <AppBar>
      <Box flex={1} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="span">
          🚗 Odiigo Admin Panel
        </Typography>
        
        <Box display="flex" alignItems="center">
          <Box mr={2} display="flex" alignItems="center">
            {/* <Avatar sx={{ bgcolor: '#1976d2', mr: 1 }}><AccountCircleIcon /></Avatar> */}
            <Typography variant="body1">{adminName}</Typography>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

const CustomLayout = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <Layout appBar={CustomAppBar}>{children}</Layout>
  </ThemeProvider>
);

export default CustomLayout;