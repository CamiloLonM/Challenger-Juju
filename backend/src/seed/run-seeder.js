import fs from 'fs';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../models/user.js';
import Book from '../models/book.js';

import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);

    console.log('Reading JSON file...');
    const rawData = fs.readFileSync('./src/seed/data.json', 'utf-8');
    const { users, books } = JSON.parse(rawData);

    console.log('Cleaning collections...');
    await User.deleteMany({});
    await Book.deleteMany({});

    console.log('Inserting users...');
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await User.create({
        ...user,
        password: hashedPassword,
      });

      console.log(`User created ${user.email}`);
    }

    console.log('Inserting books...');
    for (const book of books) {
      await Book.create(book);
      console.log(`Book created → ${book.title}`);
    }

    console.log('Seeder completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeder error:', error);
    process.exit(1);
  }
};

seedDatabase();
