import express from "express";

import eventsRouter from "./events.routes.js";

const router = express.Router();

router.use("/api/events", eventsRouter);

export default router;
