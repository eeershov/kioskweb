import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const events = {"event":"event number one"}
    res.json(events);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
