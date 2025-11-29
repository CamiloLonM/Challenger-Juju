import {
  Stack,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { useBookFilters } from '../hooks/useBookFilters';
import { useBooks } from '../hooks/useBooks';
import { api } from '../services/api';

export default function BookList({ onEdit, refresh }) {
  const {
    titleFilter,
    setTitleFilter,
    authorFilter,
    setAuthorFilter,
    clearFilters,
  } = useBookFilters();
  const { books, page, setPage, totalPages, fetchBooks } = useBooks({
    refresh,
    titleFilter,
    authorFilter,
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await api.delete(`/books/${id}`);
      fetchBooks();
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          fetchBooks();
        }}
      >
        <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
          <TextField
            label='Title'
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
          <TextField
            label='Author'
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          />
          <Button type='submit' variant='contained'>
            Search
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              clearFilters();
              setPage(1);
            }}
          >
            Clear
          </Button>
        </Stack>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>{book.publishedYear}</TableCell>
                <TableCell>{book.state}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{ mr: 1 }}
                    onClick={() => onEdit(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction='row' spacing={2} sx={{ mt: 2 }} alignItems='center'>
        <Button
          variant='outlined'
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Typography>
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant='outlined'
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}
