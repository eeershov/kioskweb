import { TimepadService, DatabaseService } from "../services/index.js";

const databaseService = new DatabaseService();

export default class SyncService {
  static async updateRemovedEvents() {
    // marks removed events in db
    // compares events in db with timepad's by timepad-id
    const databaseData = await databaseService.getEvents();
    const databaseEventId: number[] = databaseData.map((event) => event.tp_id);

    try {
      const timepadData = await TimepadService.getTimepadData({
        eventsId: databaseEventId,
      });
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

  static async updateEventsAndOrgs(gatherPreviousMonths?: number) {
    try {
      let timepadEvents;
      if (gatherPreviousMonths) {
        timepadEvents = await TimepadService.getTimepadData({
          gatherPreviousMonths,
        });
      } else {
        timepadEvents = await TimepadService.getTimepadData({});
      }

      if (timepadEvents) {
        await databaseService.updateEventsAndOrgs(timepadEvents);
        console.log("Updated with Timepad events and org data successfully.");
      }
    } catch (error) {
      console.error("Error sync with Timepad:", error);
    }
  }
}
