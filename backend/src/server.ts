import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import cors from "cors";

import apiRouter from "./routes/api.routes.js";

import { sql } from "./database/database.js";


dotenv.config();

const PORT = process.env.PORT || 8080;
const nodeEnv = process.env.NODE_ENV || "production";

const app = express();

async function testCallDB() {
  console.log(` [${new Date()}] \nCalling Home API`);
  const tabababa = await sql`
    SHOW TIME ZONE;
  `;
  console.log(tabababa);
}

await testCallDB();

app.use(cors());

app.use("/", apiRouter);

app.listen(PORT, () => {
  console.log(`===\n   ${new Date()}\n   Server listening on ${PORT}`);
});

app.get("/", (_req,res) => {
  console.log('asked');
  res.send(`ok: ${nodeEnv}`);
});