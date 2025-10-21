import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const driver = drizzle(process.env.DATABASE_URL!, { schema });
export default driver;
