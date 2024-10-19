import pino from "pino";
import { env } from "./env";

const { nodeEnv } = env;

const isProduction = nodeEnv === "production";

const productionLogger = {
  transport: {
    target: "pino/file",
    options: {
      destination: 1,
      sync: false,
    },
  },
};

const devLogger = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

export const logger = pino({
  level: isProduction ? "info" : "debug",
  ...(isProduction ? productionLogger : devLogger),
});
