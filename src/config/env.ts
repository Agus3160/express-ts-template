import dotenv from 'dotenv';
dotenv.config();

export const env = {

  //Port
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,

  //env
  nodeEnv: process.env.NODE_ENV || "development",

  //jwt
  secret: process.env.JWT_SECRET || "secret",
  expirationTime: process.env.JWT_EXPIRATION_TIME || "1d",

  //logger
  logConfig: {
    level: process.env.LOG_LEVEL || "info",
    logFile: process.env.LOG_FILE || "server.log",
    saveLogs: process.env.SAVE_LOGS === "true",
  },

  //db
  dbUrl: process.env.DATABASE_URL || "postgresql://user:password@host:port/db?schema=public"

}