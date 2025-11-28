import { Router } from 'express';
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from '../controllers/books.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', authMiddleware, createBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

export default router;
