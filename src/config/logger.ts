import pino, { TransportTargetOptions } from "pino";
import { env } from "./env";
import fs from "fs";
import path from "path";

const {
  logConfig: { level, logFile, saveLogs },
} = env;

const logDirectory = path.join(process.cwd(), "logs");

//Verifiy if log directory exists and create it if not
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const targets:TransportTargetOptions[] = [];

const pinoPretty = {
  target: "pino-pretty",
  level: "debug",
  options: {
    colorize: true,
  },
};

targets.push(pinoPretty);

if(saveLogs) {
  const pinoFile = {
    target: "pino/file",
    options: {
      destination: path.join(logDirectory, logFile),
    },
  };
  targets.push(pinoFile);
}


//Create logger
const logger = pino({
  level: level,
  transport: {
    targets: targets,
    options: {
      colorize: true,
    },
  },
});

export default logger;
