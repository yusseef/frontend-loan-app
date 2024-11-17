import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      const token = response.data.access;
      const role = response.data.role;

      if (!role) {
        throw new Error('Role not provided in the response');
      }

      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      navigate(`/${role}`);
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
