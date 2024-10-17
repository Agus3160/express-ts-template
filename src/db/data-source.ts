import { DataSource } from "typeorm";
import { join } from "path";
import { env } from "../config/env";
import { BaseEntityUtil } from "../util/base/entity";

const { dbUrl, nodeEnv } = env;

export const appDataSource = new DataSource({
  type: "postgres",
  url: dbUrl,
  synchronize: nodeEnv === "development",
  logging: true,
  entities: [join(__dirname, "entities", "*.entity{.ts,.js}"), BaseEntityUtil],
});
