import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { api } from '../services/api';
import {
  titleRules,
  AuthorRules,
  publishedYeardRules,
  descriptionRules,
  categoryRules,
} from '../utils/validationBookForm';

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
        rules={titleRules}
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
        rules={AuthorRules}
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
        rules={publishedYeardRules}
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
        name='description'
        control={control}
        rules={descriptionRules}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label='Description'
            multiline
            rows={4}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name='category'
        control={control}
        rules={categoryRules}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label='Category'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            <MenuItem value='fiction'>Fiction</MenuItem>
            <MenuItem value='non-fiction'>Non-Fiction</MenuItem>
            <MenuItem value='history'>History</MenuItem>
            <MenuItem value='technology'>Technology</MenuItem>
            <MenuItem value='education'>Education</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </TextField>
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
