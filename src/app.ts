import express from "express";
import { env } from "./config/env";
import { loader } from "./config/loader";
import { logger } from "./config/logger";
import "reflect-metadata";

const { port } = env; //Get env values

const app = express(); //Create express app

//Load config and start server
loader(app).then(() => {
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
});
