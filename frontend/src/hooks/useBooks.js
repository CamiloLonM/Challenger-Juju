import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useBooks = ({ refresh, titleFilter, authorFilter, limit = 5 }) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchBooks = async () => {
    try {
      const query = new URLSearchParams();
      query.append('page', page);
      query.append('limit', limit);
      if (titleFilter) query.append('title', titleFilter);
      if (authorFilter) query.append('author', authorFilter);

      const res = await api.get(`/books?${query.toString()}`);
      setBooks(res.data.books);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh, titleFilter, authorFilter, page]);

  const totalPages = Math.ceil(total / limit);

  return {
    books,
    page,
    setPage,
    totalPages,
    fetchBooks,
  };
};
