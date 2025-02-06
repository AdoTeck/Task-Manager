import {config} from "./env"
export const corsOptions = {
  origin: config.CLIENT_URL, // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
