import { createAudit } from '../utils/createAudit.js';
import AppError from '../utils/AppError.js';
import {
  createNewBook,
  getBooksList,
  getBookDetails,
  updateExistingBook,
  deleteExistingBook,
} from '../service/books.js';

export const createBook = async (req, res, next) => {
  try {
    const book = await createNewBook(req.body, req.user.id);

    await createAudit({
      req,
      user: req.user.id,
      action: 'CREATE',
      entity: 'Book',
      entityId: book._id,
      description: `Book created: ${book.title}`,
    });

    return res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      title = '',
      author = '',
      sort = 'createdAt',
      order = 'desc',
    } = req.query;

    page = Number(page);
    limit = Number(limit);
    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      throw new AppError('Invalid pagination parameters', 400);
    }

    const { books, total } = await getBooksList({
      page,
      limit,
      title,
      author,
      sort,
      order,
    });

    return res.status(200).json({
      books,
      results: books.length,
      total,
      page,
      limit,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await getBookDetails(req.params.id);

    return res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updated = await updateExistingBook(id, req.body);

    await createAudit({
      req,
      user: req.user.id,
      action: 'UPDATE',
      entity: 'Book',
      entityId: id,
      ipAddress: req.ip,
      description: `Book updated: ${updated.title}`,
    });

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await deleteExistingBook(id);

    await createAudit({
      req,
      user: req.user.id,
      action: 'DELETE',
      entity: 'Book',
      entityId: id,
      ipAddress: req.ip,
      description: `Book deleted: ${deleted.title}`,
    });

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};
