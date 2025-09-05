import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "pozos_user",
  password: process.env.DB_PASS || "pozos_password",
  database: process.env.DB_NAME || "pozos_db",
  port: Number(process.env.DB_PORT) || 5432,
});
