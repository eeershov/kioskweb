import { TimepadService, DatabaseService } from "../services/index.js";

const timepadService = new TimepadService();
const databaseService = new DatabaseService();

export default class SyncService {
  public async updateRemovedEvents() {
    // marks removed events in db
    // compares events in db with timepad's by timepad-id
    const databaseData = await databaseService.getEvents();
    const databaseEventId: number[] = databaseData.map((event) => event.tp_id);

    try {
      const timepadData = await timepadService.getTimepadData(databaseEventId);
      if (timepadData) {
        const timepadEventId: number[] = timepadData.map((event) => event.id);
        const diffArr = databaseEventId.filter(
          (id) => !timepadEventId.includes(id)
        );
        if (diffArr.length > 0) {
          await databaseService.updateMarkRemovedEvents(diffArr);
        }
        console.log("Synced removed events");
      }
    } catch (error) {
      console.log(`Timepad error`, error);
    }
  }

  public async updateEventsAndOrgs() {
    try {
      const timepadEvents = await timepadService.getTimepadData();
      if (timepadEvents) {
        await databaseService.updateEventsAndOrgs(timepadEvents);
        console.log("Synced with Timepad successfully.");
      }
    } catch (error) {
      console.error("Error sync with Timepad:", error);
    }
  }
}
