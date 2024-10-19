import express, { Application } from "express";
import { dataSourceLoader } from "../db/data-source";
import requestLogger from "../middleware/logger.middleware";
import { logger } from "./logger";
import { errorMiddleware } from "../error/error.middleware";
import { loadRoutes } from "../util/route-util";
import cors from "cors";
import { corsConfig } from "./cors";

export const loader = async (app: Application) => {
  try {

    //Data Source
    await dataSourceLoader(); 
    logger.info("Database connected successfully");

    //Middlewares
    app.use(requestLogger); //Request logger
    app.use(express.json()); //JSON parser
    app.use(express.urlencoded({ extended: true })); //URL parser
    app.use(cors(corsConfig)); //CORS

    //Routes
    await loadRoutes(app); //Load routes
    logger.info("Routes loaded successfully");

    //Error middleware
    app.use(errorMiddleware); //Error middleware

  } catch (error) {
    logger.error("Error while initializing data source: ", error);
    process.exit(1);
  }
};
