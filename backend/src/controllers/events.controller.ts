import { Request, Response, NextFunction } from "express";
import { DatabaseService } from "../services/index.js";


export const getEventsRecent = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await DatabaseService.getEvents();
    res.status(200).send(events);
  } catch (err) {
    next(err);
  }
};

export const getEventsByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await DatabaseService.getEvents(req.params.dateString);
    res.status(200).send(events);
  } catch (err) {
    next(err);
  }
};

