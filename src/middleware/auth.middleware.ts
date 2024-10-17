import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/error.types";
import { authService } from "../auth/auth.service";
import { Role } from "../db/entities/user.entity";

export const authMiddleware = (role?: Role) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.headers.authorization) throw new AppError(401, "Unauthorized");
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new AppError(401, "Unauthorized");
    const user = await authService.verifyToken(token);
    if (role && user.role !== role) throw new AppError(403, "Forbidden");
    req.user = user;
    next();
  };
};
