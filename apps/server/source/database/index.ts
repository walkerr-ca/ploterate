import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const driver = drizzle({
  connection: {
    user: "doadmin",
    password: process.env.DATABASE_PASSWORD!,
    host: process.env.DATABASE_HOST!,
    port: 25060,
    database: "ploterate",
    ssl: {
      ca: process.env.DATABASE_CERTIFICATE!,
    },
  },
  schema,
});

export default driver;
