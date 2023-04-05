import express, { Request, Response } from "express";
import { sql } from "../database/database.js";

import TimepadService from "../services/timepad.service.js";
const timepadService = new TimepadService();

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    // const events = { event: "event number one" };
    const events = await timepadService.getTimepadData();
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
