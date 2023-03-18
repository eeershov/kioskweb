import express, { Request, Response } from "express";
import { sql } from "../database/database.js";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = { event: "event number one" };
    const tabababa = await sql`
      SELECT CURRENT_TIMESTAMP;
    `;
    console.log(tabababa);
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
