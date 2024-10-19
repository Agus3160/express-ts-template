import dotenv from "dotenv";
dotenv.config();

export const env = {
  //Port
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,

  //env
  nodeEnv: process.env.NODE_ENV || "development",

  //jwt
  secret: process.env.JWT_SECRET || "secret",
  expirationTime: process.env.JWT_EXPIRATION_TIME || "1d",

  //cors
  corsOrigin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : ["*"],

  //db
  dbUrl:
    process.env.DATABASE_URL ||
    "postgresql://user:password@host:port/db?schema=public",
};
