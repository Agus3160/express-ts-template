import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";
import { env } from "../config/env";
import { BaseEntityUtil } from "../util/base/entity";

const { dbUrl, nodeEnv } = env;

export const appDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: dbUrl,
  synchronize: nodeEnv === "development",
  logging: true,
  migrations: [join(__dirname, "migrations")],
  entities: [join(__dirname, "entities", "*.entity{.ts,.js}"), BaseEntityUtil],
};

export const dataSource = new DataSource(appDataSourceOptions);

export const dataSourceLoader = async () => {
  await dataSource.initialize();
};
