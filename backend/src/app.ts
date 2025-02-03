import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from './config/cors';
// ...existing imports...

const app = express();

app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware
app.use(cors(corsOptions));
// ...existing code...
