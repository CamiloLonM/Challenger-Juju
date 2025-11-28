import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';
import booksRoutes from './routes/books.js';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middlewares/error.js';

const app = express();
dotenv.config();

const API_VERSION = process.env.API_VERSION;

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/books`, booksRoutes);

app.use(
  `/api/${API_VERSION}/docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler);

export default app;
