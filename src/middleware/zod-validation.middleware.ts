import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export type ZodSchemaOption = {
  schema: ZodSchema<any>;
  partial?: boolean;
};

export type ZodMiddlewareOptions = {
  body?: ZodSchemaOption;
  query?: ZodSchemaOption;
  params?: ZodSchemaOption;
};

export const zodValidationMiddleware = (options: ZodMiddlewareOptions) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (options.body) {
        req.body = options.body.schema.parse(req.body);
      }

      if (options.query) {
        req.query = options.query.schema.parse(req.query);
      }

      if (options.params) {
        req.params = options.params.schema.parse(req.params);
      }

      next();
    } catch (error) {
      return next(error);
    }
  };
};
