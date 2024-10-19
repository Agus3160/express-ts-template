import { CorsOptions } from "cors";
import { env } from "./env";

const { corsOrigin } = env;

export const corsConfig:CorsOptions = {
  origin: corsOrigin,
}