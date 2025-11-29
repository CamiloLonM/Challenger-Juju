export const userValidation = {
  name: {
    required: 'Name is required',
    minLength: { value: 3, message: 'Name must be at least 3 characters' },
    maxLength: { value: 50, message: 'Name must be at most 50 characters' },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format',
    },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 6, message: 'Min 6 characters' },
    maxLength: { value: 16, message: 'Max 16 characters' },
  },
};
