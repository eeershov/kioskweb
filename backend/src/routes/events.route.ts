import express, { Request, Response } from "express";
import { sql } from "../database/database.js";

import TimepadService from "../services/timepad.service.js";
import DatabaseService from "../services/database.service.js";

const timepadService = new TimepadService();
const databaseService = new DatabaseService();

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const orgsInfo = await sql`
      SELECT * FROM tp_organizations;
    `;
    let isFirstStart = false;
    console.log(orgsInfo);
    if (orgsInfo.length === 0) {
      isFirstStart = true;
    }
    if (isFirstStart) {
      databaseService.updateOrgs("default");
    }

    // const events = { event: "event number one" };
    const events = await timepadService.getTimepadData();
    await databaseService.updateEvents(events);
    await databaseService.updateOrgs(events);

    const tabababa = await sql`
      SELECT CURRENT_TIMESTAMP;
    `;
    console.log(tabababa);
    const tabadada = await sql`
      SELECT * FROM events;
    `;
    console.log(tabadada);

    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error" });
  }
});

export default router;
