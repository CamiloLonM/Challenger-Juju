import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import { api } from '../services/api';

export default function UserForm({ onSave, onCancel }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'user',
    },
  });

  useEffect(() => {
    reset({
      name: '',
      email: '',
      password: '',
      role: 'user',
    });
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      await api.post('/auth/register', data);
      alert('User registered successfully');
      onSave?.();
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mb: 4,
      }}
    >
      <Typography variant='h6'>Register User</Typography>

      <Controller
        name='name'
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='Name'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name='email'
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='Email'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'Min 6 characters' },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='Password'
            type='password'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name='role'
        control={control}
        render={({ field }) => (
          <TextField {...field} select label='Role'>
            <MenuItem value='user'>User</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
          </TextField>
        )}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type='submit' variant='contained'>
          Register
        </Button>
        <Button type='button' variant='outlined' onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
