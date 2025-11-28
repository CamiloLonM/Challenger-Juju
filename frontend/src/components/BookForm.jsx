import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { api } from '../services/api';

export default function BookForm({ book, onSave, onCancel }) {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (book) {
      reset({
        title: book.title || '',
        author: book.author || '',
        publishedYear: book.publishedYear || '',
        state: book.state || 'available',
      });
    } else {
      reset({ title: '', author: '', publishedYear: '', state: 'available' });
    }
  }, [book, reset]);

  const onSubmit = async (data) => {
    try {
      if (book) await api.put(`/books/${book._id}`, data);
      else await api.post('/books', data);
      onSave();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
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
      <Controller
        name='title'
        control={control}
        rules={{ required: 'Title required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='Title'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name='author'
        control={control}
        rules={{ required: 'Author required' }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='Author'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name='publishedYear'
        control={control}
        rules={{ required: 'Year required', min: 0 }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='Published Year'
            type='number'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name='state'
        control={control}
        defaultValue='available'
        render={({ field }) => (
          <TextField
            {...field}
            select
            label='State'
            value={field.value || 'available'}
          >
            <MenuItem value='available'>Available</MenuItem>
            <MenuItem value='reserved'>Reserved</MenuItem>
          </TextField>
        )}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type='submit' variant='contained'>
          Save
        </Button>
        <Button type='button' variant='outlined' onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
