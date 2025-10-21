import { Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

export default class AppError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
  }

  public static fromError(error: Error, status: number = 500) {
    return new AppError(error.message, status);
  }

  public static fromException(exception: unknown, status: number = 500) {
    if (exception instanceof AppError) {
      return exception;
    } else if (exception instanceof JsonWebTokenError) {
      return this.fromError(exception, 401);
    } else if (exception instanceof Error) {
      return this.fromError(exception, status);
    } else {
      return new AppError("An unknown error occurred.");
    }
  }

  public toResponse(response: Response) {
    response.status(this.status).json({
      success: false,
      data: {
        error: this.message,
      },
    });
  }
}
