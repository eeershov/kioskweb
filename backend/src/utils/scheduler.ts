import * as cron from "cron";
import { SyncService } from "../services/index.js";

const syncService = new SyncService();

console.log("imported job");

const cronJob = new cron.CronJob("*/10 * * * *", async () => {
  await syncService.updateEventsAndOrgs();
});

const cronJob2 = new cron.CronJob("*/27 * * * *", async () => {
  await syncService.updateRemovedEvents();
});

cronJob.start();
cronJob2.start();
