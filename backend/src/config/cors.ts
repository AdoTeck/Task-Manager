import {config} from "./env"
export const corsOptions = {
  origin: config.CLIENT_URL, // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
