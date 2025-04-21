import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  Link
} from '@mui/material';
import { API_URL } from '../config';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/api/admin/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Failed to process request');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                Forgot Password
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ color: '#4FDBC4' }}
              >
                Odiigo Admin Dashboard
              </Typography>
            </Box>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            {submitted ? (
              <Box sx={{ textAlign: 'center', my: 3 }}>
                <Alert severity="success" sx={{ mb: 3 }}>
                  If an account exists with that email, a password reset link has been sent.
                </Alert>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin-login')}
                  sx={{ 
                    mt: 2,
                    color: '#2A6887',
                    borderColor: '#2A6887',
                    '&:hover': {
                      borderColor: '#4FDBC4',
                      backgroundColor: 'rgba(79, 219, 196, 0.04)',
                    },
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  Enter your email address and we'll send you a link to reset your password.
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Link 
                    href="/admin-login" 
                    underline="hover"
                    sx={{ color: '#2A6887' }}
                  >
                    Back to Login
                  </Link>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}