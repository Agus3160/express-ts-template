import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  const originalSend = res.send.bind(res);
  res.send = (body: any) => {
    logger.info({
      statusCode: res.statusCode,
      responseBody: JSON.parse(body),
    });
    return originalSend(body);
  };

  next();
};

export default requestLogger;
