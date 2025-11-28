import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import app from './app.js';
import { logger } from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
