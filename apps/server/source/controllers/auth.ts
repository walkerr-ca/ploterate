import { Router } from "express";
import { DateTime, Interval } from "luxon";
import { z } from "zod";

import AppError from "@/utils/app-error";
import { hashPassword, comparePassword } from "@/utils/crypto";
import { createRefreshToken, createToken } from "@/middleware/authorization";

import driver from "@/database";
import {
  userTable,
  securityTable,
  sessionTable,
  timeWindowTable,
} from "@/database/schema";
import { and, eq, gt } from "drizzle-orm";
import { decryptSecret, verifyCode } from "@/utils/totp";

/*
  API /auth
  POST /auth/login
  POST /auth/session/refresh
  POST /auth/session/verify
  POST /auth/session/logout
*/
const router = Router();

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
  rememberMe: z.boolean(),
});

router.post("/login", async (request, response) => {
  try {
    const authError = new AppError(
      "The email or password provided was not correct.",
      401,
    );
    if (request.isAuthed) {
      throw new AppError("You are already logged in!", 400);
    }

    const body = loginSchema.parse(request.body);
    const userQuery = await driver
      .select()
      .from(userTable)
      .innerJoin(securityTable, eq(userTable.securityId, securityTable.id))
      .where(eq(userTable.email, body.email))
      .limit(1);

    if (userQuery.length < 1) {
      throw authError;
    }

    const [entity] = userQuery;
    const passwordMatches = await comparePassword(
      body.password,
      entity.security.password,
    );
    if (!passwordMatches) {
      throw authError;
    }

    const [session] = await driver
      .insert(sessionTable)
      .values({
        userId: entity.user.id,
        refreshToken: null,
        deletedAt: DateTime.now()
          .plus({ days: body.rememberMe ? 31 : 1 })
          .toJSDate(),
      })
      .returning({ id: sessionTable.id });

    const refreshToken = createRefreshToken();
    if (!entity.security.isMfa) {
      await driver.update(sessionTable).set({
        refreshToken: await hashPassword(refreshToken),
      });

      response.cookie("refresh_token", `${session.id}.${refreshToken}`, {
        maxAge: 1000 * 60 * 60 * 24 * (body.rememberMe ? 31 : 1),
        path: "/api/auth/session/refresh",
        sameSite: true,
        secure: true,
      });
    }

    const token = createToken(
      entity.user,
      session.id,
      entity.security.isMfa ? false : true,
    );

    response.status(200).json({
      success: true,
      data: {
        token,
      },
    });
  } catch (error) {
    AppError.fromException(error).toResponse(response);
  }
});

router.post("/session/refresh", async (request, response) => {
  try {
    const authError = new AppError(
      "Your session exired, please login again.",
      401,
    );
    if (request.isAuthed) {
      throw new AppError("You are already logged in!", 400);
    }

    const refreshCookie = request.cookies["refresh_token"];
    if (!refreshCookie) {
      throw authError;
    }

    const [sessionId, refreshToken] = refreshCookie.split(".");
    const sessionQuery = await driver
      .select()
      .from(sessionTable)
      .innerJoin(userTable, eq(userTable.id, sessionTable.userId))
      .where(
        and(
          eq(sessionTable.id, Number(sessionId)),
          gt(sessionTable.deletedAt, new Date()),
        ),
      );

    if (sessionQuery.length < 1) {
      throw authError;
    }

    const [entity] = sessionQuery;
    if (!entity.session.refreshToken) {
      throw authError;
    }

    const refreshTokenMatches = await comparePassword(
      refreshToken,
      entity.session.refreshToken,
    );
    if (!refreshTokenMatches) {
      throw authError;
    }

    const newRefreshToken = createRefreshToken();
    const token = createToken(entity.user, entity.session.id, true);

    await driver
      .update(sessionTable)
      .set({
        refreshToken: await hashPassword(newRefreshToken),
      })
      .where(eq(sessionTable.id, entity.session.id));

    const timeRemaining = Interval.fromDateTimes(
      DateTime.now(),
      DateTime.fromJSDate(entity.session.deletedAt!),
    ).length("milliseconds");

    response
      .status(200)
      .cookie("refresh_token", `${entity.session.id}.${newRefreshToken}`, {
        maxAge: timeRemaining,
        path: "/api/auth/session",
        sameSite: true,
        secure: true,
      })
      .json({
        success: true,
        data: {
          token,
        },
      });
  } catch (error) {
    AppError.fromException(error).toResponse(response);
  }
});

const sessionVerifySchema = z.object({
  code: z.string().length(6),
});

router.post("/session/verify", async (request, response) => {
  try {
    const authError = new AppError(
      "Your multi-factor code could not be verified.",
      401,
    );
    if (!request.isAuthed || request.isVerified) {
      throw authError;
    }

    const body = sessionVerifySchema.parse(request.body);
    const securityQuery = await driver
      .select()
      .from(userTable)
      .innerJoin(securityTable, eq(securityTable.id, userTable.securityId))
      .where(eq(userTable.id, request.userId!));

    if (securityQuery.length < 1) {
      throw authError;
    }

    const [{ user, security }] = securityQuery;
    if (!security.isMfa) {
      throw authError;
    }

    const totpSecret = decryptSecret(security.totpToken);
    const timestep = verifyCode(body.code, totpSecret);
    if (timestep === null) {
      throw authError;
    }

    const timeWindowQuery = await driver
      .select()
      .from(timeWindowTable)
      .where(
        and(
          eq(timeWindowTable.userId, user.id),
          eq(timeWindowTable.step, timestep),
        ),
      );

    if (timeWindowQuery.length > 0) {
      throw authError;
    }

    await driver.insert(timeWindowTable).values({
      userId: user.id,
      step: timestep,
    });

    const sessionQuery = await driver
      .select()
      .from(sessionTable)
      .where(
        and(
          eq(sessionTable.id, request.sessionId!),
          gt(sessionTable.deletedAt, new Date()),
        ),
      );

    if (sessionQuery.length < 1) {
      throw authError;
    }

    const [session] = sessionQuery;
    const refreshToken = createRefreshToken();
    const token = createToken(user, request.sessionId!, true);

    await driver
      .update(sessionTable)
      .set({
        refreshToken: await hashPassword(refreshToken),
      })
      .where(eq(sessionTable.id, session.id));

    const timeRemaining = Interval.fromDateTimes(
      DateTime.now(),
      DateTime.fromJSDate(session.deletedAt!),
    ).length("milliseconds");

    response
      .status(200)
      .cookie("refresh_token", `${session.id}.${refreshToken}`, {
        maxAge: timeRemaining,
        path: "/api/auth/session/refresh",
        sameSite: true,
        secure: true,
      })
      .json({
        success: true,
        data: {
          token,
        },
      });
  } catch (error) {
    AppError.fromException(error).toResponse(response);
  }
});

router.post("/session/logout", async (request, response) => {
  try {
    const authError = new AppError(
      "Your session exired, please login again.",
      401,
    );

    const refreshCookie = request.cookies["refresh_token"];
    if (!refreshCookie) {
      throw authError;
    }

    const [sessionId, refreshToken] = refreshCookie.split(".");
    const sessionQuery = await driver
      .select()
      .from(sessionTable)
      .innerJoin(userTable, eq(userTable.id, sessionTable.userId))
      .where(
        and(
          eq(sessionTable.id, Number(sessionId)),
          gt(sessionTable.deletedAt, new Date()),
        ),
      );

    if (sessionQuery.length < 1) {
      throw authError;
    }

    const [{ session }] = sessionQuery;
    if (!session.refreshToken) {
      throw authError;
    }

    const refreshTokenMatches = await comparePassword(
      refreshToken,
      session.refreshToken,
    );
    if (!refreshTokenMatches) {
      throw authError;
    }

    await driver.update(sessionTable).set({
      deletedAt: new Date(),
    });

    response
      .status(200)
      .cookie("refresh_token", null)
      .json({
        success: true,
        data: {
          redirect: "/",
        },
      });
  } catch (error) {
    AppError.fromException(error).toResponse(response);
  }
});

export default router;
