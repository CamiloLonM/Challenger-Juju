import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Online Database connected');
  } catch (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  }
};
