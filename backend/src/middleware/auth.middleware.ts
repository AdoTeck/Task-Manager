import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Define the user interface for the token payload
interface UserPayload {
  id?: string;
  email: string;
  userName: string;
  refecode?: string;
  isGoogleUser?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    } else {
      console.error("Authorization header or token cookie missing");
      res.status(401).json({ error: "Authorization header or token cookie required" });
      return;
    }

    console.log("Token:", token);

    let decoded: UserPayload;

    if (req.headers["google-auth"]) {
      // **Google Authentication Flow**
      console.log("Verifying Google token...");
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new Error("Invalid Google token");

      decoded = {
        email: payload.email!,
        userName: payload.given_name || payload.email!.split("@")[0], // Default username
        isGoogleUser: true,
      };

    } else {
      // **Normal JWT Authentication Flow**
      decoded = verifyToken(token) as UserPayload;
      console.log("Decoded Token:", decoded);
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
