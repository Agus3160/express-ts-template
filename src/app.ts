import express from "express";
import { env } from "./config/env";
import { appConfig } from "./util/app/app.service";
import { appDataSource } from "./db/data-source";
import { errorMiddleware } from "./error/error.middelware";
import requestLogger from "./middleware/logger.middleware";
import logger from "./config/logger";
import "reflect-metadata";

const { port } = env; //Get env values

//Connect the db
appDataSource
  .initialize()
  .then(() => logger.info("Data Source has been initialized!"))
  .catch((err) =>
    logger.error("Error during Data Source initialization", err)
  );

const app = appConfig.getApp(); //Get express app

app.use(express.json()); //JSON parser

app.use(requestLogger); //Request logger

//Load routes
appConfig
  .loadRoutes()
  .then(() => {
    logger.info("Routes loaded!");
    app.use(errorMiddleware); //Error middleware
  })
  .catch((err) => logger.error(err));

//Start server
appConfig.start(port);
