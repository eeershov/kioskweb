import express, { Request, Response } from "express";
import { DatabaseService } from "../services/index.js";
const databaseService = new DatabaseService();

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = await databaseService.getEvents();
    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error" });
  }
});

export default router;
