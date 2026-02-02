import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

export const db = drizzle(client, { schema });
