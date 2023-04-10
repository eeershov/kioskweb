import * as cron from "cron";
import { SyncService } from "../services/index.js";

const syncService = new SyncService();

console.log("imported job");

const cronJob = new cron.CronJob("*/10 * * * *", async () => {
  await syncService.updateEventsAndOrgs();
});

cronJob.start();
