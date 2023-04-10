import * as cron from "cron";
import { DatabaseService, TimepadService } from "../services/index.js";

const databaseService = new DatabaseService();
const timepadService = new TimepadService();

console.log("imported job");

const cronJob = new cron.CronJob("*/10 * * * *", async () => {
  try {
    const events = await timepadService.getTimepadData();
    await databaseService.syncTimepad(events);
    console.log("Synced with Timepad successfully.");
  } catch (error) {
    console.error("Error sync with Timepad:", error);
  }
});

cronJob.start();
