import express from "express";
import { getEventsByDate, getEventsRecent } from "../controllers/events.controller";

const router = express.Router();

router
  .route("")
  .get(getEventsRecent);

router
  .route("/:dateString")
  .get(getEventsByDate);

export default router;
