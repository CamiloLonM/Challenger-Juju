import { useState } from 'react';
import LoginForm from './components/LoginForm';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { Container, Button } from '@mui/material';

function App() {
  const [user, setUser] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  if (!user) return <LoginForm onLogin={setUser} />;

  const handleSave = () => {
    setShowForm(false);
    setEditingBook(null);
    setRefreshList((prev) => !prev);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h1>Book Management System</h1>
      <Button
        variant='contained'
        onClick={() => setShowForm(true)}
        sx={{ mb: 2 }}
      >
        Add New Book
      </Button>

      {showForm && (
        <BookForm
          book={editingBook}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
        />
      )}

      <BookList
        onEdit={(book) => {
          setEditingBook(book);
          setShowForm(true);
        }}
        refresh={refreshList}
      />
    </Container>
  );
}

export default App;
