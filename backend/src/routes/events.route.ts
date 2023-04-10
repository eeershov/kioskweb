import express, { Request, Response } from "express";
import { DatabaseService } from "../services/index.js";

const databaseService = new DatabaseService();

const router = express.Router();

import { sql } from "../database/database.js";
router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = await databaseService.getEvents();

    const tabababa = await sql`
      SELECT CURRENT_TIMESTAMP;
    `;
    console.log(tabababa);

    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error" });
  }
});

export default router;
