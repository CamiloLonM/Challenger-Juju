import { useState } from 'react';

export const useBookFilters = () => {
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');

  const clearFilters = () => {
    setTitleFilter('');
    setAuthorFilter('');
  };

  return {
    titleFilter,
    setTitleFilter,
    authorFilter,
    setAuthorFilter,
    clearFilters,
  };
};
