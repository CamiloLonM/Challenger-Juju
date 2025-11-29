export const AuthorRules = {
  required: 'Author name is required',
  minLength: { value: 3, message: 'Author name must be at least 3 characters' },
  maxLength: {
    value: 50,
    message: 'Author name namee must be at most 50 characters',
  },
};

export const emailRules = {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format',
  },
};

export const publishedYeardRules = {
  required: 'publishedYear is required',
  min: { value: 0, message: 'Min 0 characters' },
  max: {
    value: new Date().getFullYear(),
    message: 'Published year cannot be in the future',
  },
};

export const titleRules = {
  required: 'Title is required',
  minLength: { value: 3, message: 'Title must be at least 3 characters' },
  maxLength: { value: 50, message: 'Title cannot exceed 50 characters' },
};

export const descriptionRules = {
  required: 'Description is required',
  minLength: {
    value: 10,
    message: 'Description must be at least 10 characters',
  },
  maxLength: {
    value: 500,
    message: 'Description must be at most 500 characters',
  },
};

export const categoryRules = {
  required: 'Category is required',
  validate: (value) =>
    [
      'fiction',
      'non-fiction',
      'history',
      'technology',
      'education',
      'other',
    ].includes(value) || 'Invalid category',
};
