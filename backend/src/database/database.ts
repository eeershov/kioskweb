import * as dotenv from 'dotenv';
import postgres from 'postgres';
dotenv.config();

const POSTGRESQL_USER = process.env.POSTGRES_USER;
const POSTGRESQL_PASS = process.env.POSTGRES_PASSWORD;
const POSTGRESQL_HOST = 'db';
// const POSTGRESQL_PORT = parseInt(process.env.POSTGRESQL_PORT);
const POSTGRESQL_DBNAME = process.env.POSTGRES_DB;
console.log(`postgres ENVS: \nuser:${POSTGRESQL_USER}\npass:${POSTGRESQL_PASS}\ndbname:${POSTGRESQL_DBNAME}`)

// 'postgres' start

const sql = postgres({
  host: POSTGRESQL_HOST,
  port: 5432,
  user: POSTGRESQL_USER,
  password: POSTGRESQL_PASS,
  database: POSTGRESQL_DBNAME
});
// 'postgres' end


export { sql };