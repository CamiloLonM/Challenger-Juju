import { useState } from 'react';
import { api, setAuthToken } from '../services/api';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [role] = useState('user');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      setAuthToken(token);
      onLogin(user);
      alert('Login successful');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      if (!name) return alert('Name is required for registration');
      if (password.length < 6)
        return alert('Password must be at least 6 chars');

      await api.post('/auth/register', {
        name,
        email,
        password,
        role,
      });

      alert('User registered successfully! You can now login.');

      setIsRegistering(false);
      setName('');
      setPassword('');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) handleRegister();
    else handleLogin();
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant='h4' align='center' sx={{ mb: 2 }}>
        {isRegistering ? 'Register' : 'Login'}
      </Typography>

      {isRegistering && (
        <TextField
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <TextField
        label='Email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type='submit' variant='contained'>
        {isRegistering ? 'Register' : 'Login'}
      </Button>

      <Button
        type='button'
        variant='outlined'
        onClick={() => setIsRegistering((prev) => !prev)}
      >
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </Button>
    </Box>
  );
}
