import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
  Express,
} from "express";
import { zodValidationMiddleware } from "../../middleware/zod-validation.middleware";
import { glob } from "glob";
import * as path from "path";
import { RouteConfig } from "../definitions";
import logger from "../../config/logger";

export class AppConfig {
  private app: Express;
  private apiPrefix?: string;

  constructor(apiPrefix?: string) {
    this.app = express();
    this.apiPrefix = apiPrefix;
  }

  private wrapHandler =
    (
      handler: (
        req: Request,
        res: Response,
        next: NextFunction
      ) => Promise<any> | any
    ): RequestHandler =>
    (req, res, next) =>
      handler(req, res, next).catch(next);

  public start(port: number) {
    this.app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  }

  public setUpRoute(routeConfigs: RouteConfig) {
    const router = Router();
    routeConfigs.paths.forEach((config) => {
      const middlewares: RequestHandler[] = [];

      if (config.validation)
        middlewares.push(
          this.wrapHandler(zodValidationMiddleware(config.validation))
        );

      if (config.middlewares && config.middlewares.length > 0)
        middlewares.push(...config.middlewares.map(this.wrapHandler));

      router[config.method](
        config.path,
        ...middlewares,
        this.wrapHandler(config.handler)
      );
    });

    return router;
  }

  public async loadRouteFromFile(filePath: string) {
    const module: { default: RouteConfig } = await import(filePath);
    const routeConfig: RouteConfig = module.default;
    logger.info(`ROUTE ${routeConfig.prefix} LOADED`);
    const route = this.setUpRoute(routeConfig);
    this.app.use(
      this.apiPrefix
        ? `${this.apiPrefix}${routeConfig.prefix}`
        : routeConfig.prefix,
      route
    );
  }

  public async loadRoutes() {
    const rootDir = path.resolve(__dirname, "../..");
    const pattern = "**/*.route.{ts,js}";
    const files = await glob(pattern, { cwd: rootDir });
    for (const file of files) {
      const fullPath = path.resolve(rootDir, file);
      await this.loadRouteFromFile(fullPath);
    }
  }

  //GETTERS && SETTERS
  public getApp() {
    return this.app;
  }
}

export const appConfig = new AppConfig();
