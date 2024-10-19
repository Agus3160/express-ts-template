import {
  NextFunction,
  Request,
  Response,
  RequestHandler,
  Router,
  Application,
} from "express";
import { RouteConfig } from "./definitions";
import { zodValidationMiddleware } from "../middleware/zod-validation.middleware";
import { logger } from "../config/logger";
import path from "path";
import { glob } from "glob";
import { env } from "../config/env";

const { nodeEnv } = env;

const isProduction = nodeEnv === "production";

export const wrapHandler =
  (
    handler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<any> | any
  ): RequestHandler =>
  (req, res, next) =>
    handler(req, res, next).catch(next);

export const setUpRoute = (routeConfigs: RouteConfig) => {
  const router = Router();
  routeConfigs.paths.forEach((config) => {
    const middlewares: RequestHandler[] = [];

    if (config.validation)
      middlewares.push(wrapHandler(zodValidationMiddleware(config.validation)));
    if (config.middlewares && config.middlewares.length > 0)
      middlewares.push(...config.middlewares.map(wrapHandler));

    router[config.method](
      config.path,
      ...middlewares,
      wrapHandler(config.handler)
    );
  });

  return router;
};

export const loadRouteFromFile = async (
  app: Application,
  filePath: string,
  apiPrefix?: string
) => {
  const module: { default: RouteConfig } = await import(filePath);
  const routeConfig: RouteConfig = module.default;
  logger.info(`Route: [${routeConfig.prefix}] loaded`);
  const route = setUpRoute(routeConfig);
  app.use(
    apiPrefix ? `${apiPrefix}${routeConfig.prefix}` : routeConfig.prefix,
    route
  );
};

export const loadRoutes = async (app: Application, apiPrefix?: string) => {
  const rootDir = path.resolve(process.cwd(), isProduction ? "dist" : "src");
  const pattern = `**/*.route.${isProduction ? "js" : "ts"}`;
  const files = await glob(pattern, { cwd: rootDir });
  for (const file of files) {
    const fullPath = path.resolve(rootDir, file);
    await loadRouteFromFile(app, fullPath, apiPrefix);
  }
};
