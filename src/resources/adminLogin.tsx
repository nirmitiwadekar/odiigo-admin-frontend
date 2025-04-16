// // src/resources/adminLogin.tsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Box, 
//   Card, 
//   CardContent, 
//   Typography, 
//   TextField, 
//   Button, 
//   Container,
//   Alert
// } from '@mui/material';
// import { API_URL } from '../config';

// interface AdminLoginProps {
//   onLoginSuccess: () => void;
// }

// export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const res = await fetch(`${API_URL}/api/admin/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
      
//       if (res.ok) {
//         localStorage.setItem('adminToken', data.token);
//         localStorage.setItem('adminInfo', JSON.stringify({
//           id: data.admin.id,
//           name: data.admin.name,
//           email: data.admin.email
//         }));
//         onLoginSuccess();
//         navigate('/admin');
//       } else {
//         setError(data.message || 'Login failed');
//       }
//     } catch (err) {
//       setError('Server error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 8 }}>
//       <Card sx={{ borderBlockStyle:'hidden', boxShadow: 5 , backgroundColor:'whitesmoke'}}>
//         <CardContent>
//           <Box sx={{ textAlign: 'center', mb: 4 , mt: 4}}>
//             <Typography variant="h4" component="h1" gutterBottom>
//               Admin Login
//             </Typography>
//             <Typography variant="subtitle1" color="secondary"
//             >
//                Odiigo Admin Dashboard
//             </Typography>
//           </Box>
          
//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
//           <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2, py: 1.5 }}
//               disabled={loading}
//             >
//               {loading ? 'Signing in...' : 'Sign In'}
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }
// src/resources/adminLogin.tsx
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
  Alert
} from '@mui/material';
import { API_URL } from '../config';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminInfo', JSON.stringify({
          id: data.admin.id,
          name: data.admin.name,
          email: data.admin.email
        }));
        onLoginSuccess();
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
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
                Admin Login
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ color: '#4FDBC4' }}
              >
                Odiigo Admin Dashboard
              </Typography>
            </Box>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}