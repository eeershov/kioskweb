import express, { Request, Response } from "express";
import helmet from "helmet";
// import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";

import apiRouter from "./routes/api.routes.js";
import "./utils/scheduler.js";

process.env.TZ = "Europe/Moscow";
const PORT = process.env.PORT || 8080;
const nodeEnv = process.env.NODE_ENV || "production";
const app = express();

function shouldCompress(req: Request, res: Response) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}
app.use(compression({ filter: shouldCompress }));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use(limiter);

// app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/", apiRouter);

app.get("/", (_req, res) => {
  console.log("asked");
  res.send(`ok: ${nodeEnv}`);
});

app.listen(PORT, () => {
  console.log(`===\n   ${new Date()}\n   Server listening on ${PORT}`);
});
