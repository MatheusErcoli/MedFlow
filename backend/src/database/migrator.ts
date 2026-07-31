import { Umzug, SequelizeStorage } from "umzug";
import sequelize from "../config/database";

export const migrator = new Umzug({
  migrations: {
    glob: "src/database/migrations/*.ts",
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export async function migrate() {
  await migrator.up();
}

export async function rollback() {
  await migrator.down();
}