// // src/components/RequireAuth.tsx
// import { Navigate } from "react-router-dom";

// export default function RequireAuth({ children }: { children: JSX.Element }) {
//   const token = localStorage.getItem("adminToken");
//   return token ? children : <Navigate to="/admin-login" />;
// }
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // You can optionally verify the token with your backend here
        // For now, we'll just check if it exists
        setAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Listen for storage changes (e.g., logout in another tab)
    const handleStorageChange = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setAuthenticated(false);
        navigate('/admin-login');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);
  
  useEffect(() => {
    if (!loading && !authenticated) {
      // Redirect to login page but remember where they were going
      navigate('/admin-login', { 
        state: { from: location.pathname }
      });
    }
  }, [loading, authenticated, navigate, location]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: '#f5f5f5'
        }}
      >
        <CircularProgress sx={{ color: '#4FDBC4' }} />
      </Box>
    );
  }

  return authenticated ? <>{children}</> : null;
}