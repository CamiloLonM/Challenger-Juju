import Book from '../models/book.js';
import { cleanString } from '../utils/books.js';
import AppError from '../utils/AppError.js';

export const createNewBook = async (bookData, userId) => {
  let { title, author } = bookData;

  title = cleanString(title);
  author = cleanString(author);

  if (!title || !author) {
    throw new AppError('Title and author are required', 400);
  }

  const exists = await Book.findOne({ title, author });
  if (exists) {
    throw new AppError('A book with this title and author already exists', 400);
  }

  const book = await Book.create({
    ...bookData,
    title,
    author,
    createdBy: userId,
  });

  return book;
};

export const getBooksList = async ({
  page,
  limit,
  title,
  author,
  sort,
  order,
}) => {
  const filters = {};
  if (title) filters.title = { $regex: title, $options: 'i' };
  if (author) filters.author = { $regex: author, $options: 'i' };

  const sortOptions = { [sort]: order === 'desc' ? -1 : 1 };
  const skipAmount = (page - 1) * limit;

  const [books, total] = await Promise.all([
    Book.find(filters).sort(sortOptions).skip(skipAmount).limit(limit),
    Book.countDocuments(filters),
  ]);

  return { books, total };
};

export const getBookDetails = async (id) => {
  const book = await Book.findById(id).populate('createdBy', 'name email');

  if (!book) {
    throw new AppError('Book not found', 404);
  }

  return book;
};

export const updateExistingBook = async (id, updateData) => {
  const book = await Book.findById(id);
  if (!book) {
    throw new AppError('Book not found', 404);
  }

  let { title, author } = updateData;

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

  const updated = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return updated;
};

export const deleteExistingBook = async (id) => {
  const deleted = await Book.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError('Book not found', 404);
  }

  return deleted;
};
