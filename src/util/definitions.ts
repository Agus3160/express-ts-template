import { NextFunction, RequestHandler, Request, Response } from "express";
import { ZodMiddlewareOptions } from "../middleware/zod-validation.middleware";

export interface ApiResponse<T=null> {
  status: number;
  success: boolean;
  message: string;
  error?: string[];
  data: T;
}

export interface PathConfig {
  path: string;
  method: "get" | "post" | "put" | "delete";
  validation?: ZodMiddlewareOptions; 
  handler: (req: Request, res: Response, next: NextFunction) => any;
  middlewares?: RequestHandler[];
}

export interface RouteConfig {
  prefix:string,
  paths:PathConfig[]
}

export interface AppConfigConstructor {
  apiPrefix?: string;
  globalErrorMiddleware?: RequestHandler;
}