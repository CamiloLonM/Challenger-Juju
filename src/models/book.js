import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    description: {
      type: String,
      default: '',
    },
    publishedYear: {
      type: Number,
      min: 0,
      max: new Date().getFullYear(),
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
    state: {
      type: String,
      enum: ['available', 'reserved'],
      default: 'available',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ title: 1, author: 1 }, { unique: true });

export default mongoose.model('Book', bookSchema);
