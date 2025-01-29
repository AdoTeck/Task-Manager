import express, { Express } from 'express';
import dotenv from 'dotenv';
import  { connectToDatabase } from './src/config/db';
import cors from 'cors';

// import { router as taskRoutes } from './src/routes/taskRoutes';
import authRoutes from './src/routes/authRoutes';
import { errorHandler } from './src/utils/errorHandler';

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors())
connectToDatabase();
// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;