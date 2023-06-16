import * as cron from "cron";
import { SyncService, DatabaseService } from "../services/index.js";

const cronJob = new cron.CronJob("*/10 * * * *", async () => {
  await SyncService.updateEventsAndOrgs();
});

const cronJob2 = new cron.CronJob("*/27 * * * *", async () => {
  await SyncService.updateRemovedEvents();
});

// check: if table has any data
// populate empty db with data
// finally: start jobs
async function populateEmptyDB(numberOfMonths: number) {
  const checkAnyData = await DatabaseService.getOne();
  if (checkAnyData[0].exists === false) {
    console.log("DB is empty, populating from Timepad");
    const start = Date.now();

    while (numberOfMonths > 0) {
      await SyncService.updateEventsAndOrgs(numberOfMonths);
      numberOfMonths--;
    }
    const end = Date.now();
    const duration = end - start;
    console.log(
      `Populating DB is complete, time taken: ${duration / 1000} seconds.`
    );
  }

  // finally
  cronJob.start();
  cronJob2.start();
}
populateEmptyDB(6);
