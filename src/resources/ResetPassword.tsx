import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import { API_URL } from '../config';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState(true);
  const [validating, setValidating] = useState(true);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    // We could validate the token on load, but the backend handles this
    // This is just a simple check to ensure a token exists
    if (!token) {
      setValidToken(false);
      setValidating(false);
    } else {
      setValidating(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/api/admin/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate('/admin-login'), 3000);
      } else {
        setError(data.message || 'Password reset failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #4FDBC4 0%, #2A6887 100%)',
        }}
      >
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    );
  }

  if (!validToken) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #4FDBC4 0%, #2A6887 100%)',
          padding: 3
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)', 
            overflow: 'hidden' 
          }}>
            <CardContent sx={{ padding: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#2A6887',
                    mb: 1
                  }}
                >
                  Invalid Reset Link
                </Typography>
              </Box>
              <Alert severity="error" sx={{ mb: 3 }}>
                This password reset link is invalid or has expired.
              </Alert>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/admin-forgot-password')}
                sx={{ 
                  mt: 2, 
                  py: 1.5,
                  backgroundColor: '#4FDBC4',
                  color: '#fff',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#2A6887',
                  }
                }}
              >
                Request New Reset Link
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #4FDBC4 0%, #2A6887 100%)',
        padding: 3
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ 
          borderRadius: 2, 
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)', 
          overflow: 'hidden' 
        }}>
          <CardContent sx={{ padding: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#2A6887',
                  mb: 1
                }}
              >
                Reset Password
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ color: '#4FDBC4' }}
              >
                Odiigo Admin Dashboard
              </Typography>
            </Box>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Password reset successfully! Redirecting to login...
              </Alert>
            )}
            
            {!success && (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#4FDBC4',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2A6887',
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#4FDBC4',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#2A6887',
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 3, 
                    mb: 2, 
                    py: 1.5,
                    backgroundColor: '#4FDBC4',
                    color: '#fff',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#2A6887',
                    },
                    '&:disabled': {
                      backgroundColor: '#a7e8dc',
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}