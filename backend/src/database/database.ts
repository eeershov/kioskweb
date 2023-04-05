// import * as dotenv from "dotenv";
import postgres from "postgres";
// dotenv.config();

const POSTGRESQL_USER = process.env.POSTGRES_USER;
const POSTGRESQL_PASS = process.env.POSTGRES_PASSWORD;
const POSTGRESQL_HOST = "db";
const POSTGRESQL_DBNAME = process.env.POSTGRES_DB;

const sql = postgres({
  host: POSTGRESQL_HOST,
  port: 5432,
  user: POSTGRESQL_USER,
  password: POSTGRESQL_PASS,
  database: POSTGRESQL_DBNAME,
});

export { sql };
