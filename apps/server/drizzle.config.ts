import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve("..", "..", ".env") });
export default defineConfig({
  out: "./drizzle",
  schema: "./source/database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    user: "doadmin",
    password: process.env.DATABASE_PASSWORD!,
    host: process.env.DATABASE_HOST!,
    port: 25060,
    database: "ploterate",
    ssl: {
      ca: process.env.DATABASE_CERTIFICATE!,
    },
  },
});
