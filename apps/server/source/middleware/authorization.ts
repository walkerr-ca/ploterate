import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload, sign } from "jsonwebtoken";
import AppError from "@/utils/app-error";

import driver from "@/database";
import { sessionTable, userTable } from "@/database/schema";
import { eq, gt, and } from "drizzle-orm";
import { randomBytes } from "crypto";

export interface Token {
  sub: number; // UserId
  sid: number; // SessionId
  email: string;
  firstName: string;
  lastName: string;
  type: string;
  isAdmin: boolean;
  isVerified: boolean;
}

export const authorize = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  request.isAuthed = false;
  request.isVerified = false;

  try {
    const header = request.headers.authorization;
    if (header && header.startsWith("Bearer")) {
      const authorization = header.replace("Bearer ", "");
      const token = verify(authorization, process.env.JWT_PUBLIC!, {
        algorithms: ["RS256"],
        audience: process.env.JWT_AUDIENCE!,
        issuer: process.env.JWT_ISSUER!,
      });

      if (!(typeof token === "string")) {
        const typedToken = token as JwtPayload & Token;
        const sessionQuery = await driver
          .selectDistinct()
          .from(sessionTable)
          .where(
            and(
              eq(sessionTable.id, typedToken.sid),
              eq(sessionTable.userId, typedToken.sub),
              gt(sessionTable.deletedAt, new Date()),
            ),
          );

        if (sessionQuery.length === 1) {
          request.sessionId = sessionQuery[0].id;
          request.userId = sessionQuery[0].userId;
          request.isAuthed = true;
          request.isVerified = typedToken.isVerified;
          request.identity = typedToken;
        }
      }
    }

    next();
  } catch (error) {
    AppError.fromException(error, 401).toResponse(response);
  }
};

export const createRefreshToken = (): string => {
  return randomBytes(32).toString("hex");
};

export const createToken = (
  user: typeof userTable.$inferSelect,
  sessionId: number,
  isVerified: boolean = true,
) => {
  const tokenData: Token = {
    sub: user.id,
    sid: sessionId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type,
    isAdmin: user.isAdmin,
    isVerified,
  };

  return sign(tokenData, process.env.JWT_PRIVATE!, {
    algorithm: "RS256",
    audience: process.env.JWT_AUDIENCE!,
    issuer: process.env.JWT_ISSUER!,
    expiresIn: "15m",
  });
};
