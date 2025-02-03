import express, { Express } from 'express';
import dotenv from 'dotenv';
import  { connectToDatabase } from './src/config/db';
import cors from 'cors';

// import { router as taskRoutes } from './src/routes/taskRoutes';
import authRoutes from './src/routes/authRoutes';
import projects from './src/routes/projectRoutes';
import { errorHandler } from './src/utils/errorHandler';
import cookieParser from 'cookie-parser';
import { corsOptions } from './src/config/cors';

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
connectToDatabase();
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projects)

// Error handling middleware
app.use(errorHandler);

export default app;