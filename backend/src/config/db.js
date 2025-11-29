import mongoose from 'mongoose';

export class Database {
  static instance = null;

  connection = null;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }

  /**
   * @returns {Database}
   */
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect() {
    if (this.connection) {
      console.log('Database connection already established.');
      return this.connection;
    }

    try {
      this.connection = await mongoose.connect(process.env.MONGO_URI);

      console.log('Online Database connected.');

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB Error after connection:', err.message);
      });
      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected. Attempting to reconnect...');
      });

      return this.connection;
    } catch (error) {
      console.error('Error initializing database:', error.message);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log('Database disconnected.');
    }
  }
}

export const connectDB = () => Database.getInstance().connect();
