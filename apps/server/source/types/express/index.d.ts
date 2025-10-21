// src/types/express.d.ts
import "express";
import { Token } from "@/middleware/authorization";

declare global {
  namespace Express {
    interface Request {
      isAuthed: boolean;
      isVerified: boolean;
      userId?: number;
      sessionId?: number;
      identity?: Token;
    }
  }
}
