import { Response, Request, NextFunction } from "express";
import { generateReponse } from "../util/util";
import { AppError } from "./error.types";
import { ApiResponse } from "../util/definitions";
import { ZodError } from "zod";
import { logger } from "../config/logger";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(
    {
      path: req.originalUrl,
      error: err,
      trace: err.stack,
    },
    `ERROR IN PATH: ${req.originalUrl}`
  );

  const responseData: ApiResponse = {
    status: 500,
    success: false,
    message: "Internal server error",
    data: null,
  };

  if (err instanceof ZodError) {
    const normalizatedIssues = err.issues.map((issue) => {
      return `${issue.path.join(".")}: ${issue.message}`;
    });
    return generateReponse(res, {
      ...responseData,
      status: 400,
      message: "Bad request",
      error: normalizatedIssues,
    });
  }

  if (err instanceof AppError) {
    return generateReponse(res, {
      ...responseData,
      status: err.status,
      message: err.message,
      error: err.errors,
    });
  }

  if (err instanceof Error) return generateReponse(res, responseData);

  return generateReponse(res, responseData);
};
