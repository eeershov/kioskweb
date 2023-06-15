import express, { Request, Response, NextFunction } from "express";
import { DatabaseService } from "../services/index.js";
const databaseService = new DatabaseService();

const router = express.Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await databaseService.getEvents();
    res.status(200).send(events);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:dateString",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await databaseService.getEvents(req.params.dateString);
      res.status(200).send(events);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
