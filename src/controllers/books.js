import Book from '../models/book.js';
import { cleanString } from '../utils/books.js';
import { createAudit } from '../utils/createAudit.js';
import AppError from '../utils/AppError.js';

export const createBook = async (req, res) => {
  try {
    const { title, author, description, publishedYear, category, state } =
      req.body;

    title = cleanString(title);
    author = cleanString(author);

    if (!title || !author) {
      throw new AppError('Title and author are required', 400);
    }

    const exists = await Book.findOne({ title, author });

    if (exists) {
      return res
        .status(400)
        .json({ message: 'A book with this title and author already exists' });
    }

    const book = await Book.create({
      title,
      author,
      description,
      publishedYear,
      category,
      state,
      createdBy: req.user.id,
    });

    await createAudit({
      user: req.user.id,
      action: 'CREATE',
      entity: 'Book',
      entityId: book._id,
      ipAddress: req.ip,
      description: `Book created: ${book.title}`,
    });

    return res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    next(err);
  }
};

export const getBooks = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = '',
      sort = 'createdAt',
      order = 'desc',
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      throw new AppError('Invalid pagination parameters', 400);
    }

    const filters = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const books = await Book.find(filters)
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Book.countDocuments(filters);

    return res.status(200).json({
      books,
      results: books.length,
      total,
      page,
      limit,
    });
  } catch (error) {
    next(err);
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id).populate('createdBy', 'name email');

    if (!book) throw new AppError('Book not found', 404);

    return res.status(200).json(book);
  } catch (error) {
    next(err);
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = await Book.findById(id);
    if (!book) throw new AppError('Book not found', 404);

    if (title) title = cleanString(title);
    if (author) author = cleanString(author);

    if ((title && title !== book.title) || (author && author !== book.author)) {
      const duplicate = await Book.findOne({ title, author });

      if (duplicate && duplicate._id.toString() !== id) {
        throw new AppError(
          'Another book with this title and author already exists',
          409
        );
      }
    }

    const updated = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    await createAudit({
      user: req.user.id,
      action: 'UPDATE',
      entity: 'Book',
      entityId: id,
      ipAddress: req.ip,
      description: `Book updated: ${updated.title}`,
    });

    return res.status(200).json(updated);
  } catch (error) {
    next(err);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) throw new AppError('Book not found', 404);

    await createAudit({
      user: req.user.id,
      action: 'DELETE',
      entity: 'Book',
      entityId: id,
      ipAddress: req.ip,
      description: `Book deleted: ${deleted.title}`,
    });

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(err);
  }
};
