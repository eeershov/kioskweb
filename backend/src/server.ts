import express from "express";
import cors from "cors";

import apiRouter from "./routes/api.routes.js";
import "./utils/scheduler.js";

process.env.TZ = "Europe/Moscow";
const PORT = process.env.PORT || 8080;
const nodeEnv = process.env.NODE_ENV || "production";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", apiRouter);

app.get("/", (_req, res) => {
  console.log("asked");
  res.send(`ok: ${nodeEnv}`);
});

app.listen(PORT, () => {
  console.log(`===\n   ${new Date()}\n   Server listening on ${PORT}`);
});
