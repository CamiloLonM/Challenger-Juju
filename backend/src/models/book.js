import mongoose from 'mongoose';

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [50, 'Title cannot exceed 50 characters'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      minlength: [3, 'Author name must be at least 3 characters'],
      maxlength: [50, 'Author name must be at most 50 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [500, 'Description must be at most 500 characters'],
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: [true, 'Published year is required'],
      min: [0, 'Published year cannot be negative'],
      max: [currentYear, 'Published year cannot be in the future'],
    },
    state: {
      type: String,
      enum: ['available', 'reserved'],
      default: 'available',
    },
    category: {
      type: String,
      enum: [
        'fiction',
        'non-fiction',
        'history',
        'technology',
        'education',
        'other',
      ],
      default: 'other',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
bookSchema.index({ title: 1, author: 1 }, { unique: true });

export default mongoose.model('Book', bookSchema);
