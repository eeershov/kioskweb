import { TimepadService, DatabaseService } from "../services/index.js";
import { EventData, TimepadEventData } from "../types/index.js";

const timepadService = new TimepadService();
const databaseService = new DatabaseService();

export default class SyncService {
  private async updateRemovedEvents() {
    // marks removed events in db
    // compares events in db with timepad's by timepad-id
    const dbData: EventData[] = await databaseService.getEvents();

    const databaseEventId: number[] = [];
    dbData.forEach((element) => {
      databaseEventId.push(element.tp_id);
    });

    const tpData = await timepadService.getTimepadData(databaseEventId);
    const timepadEventId: number[] = [];
    tpData.forEach((element: TimepadEventData) => {
      timepadEventId.push(element.id);
    });

    const a = new Set(databaseEventId);
    const b = new Set(timepadEventId);
    const a_minus_b = new Set([...a].filter((x) => !b.has(x)));
    const diffArr = Array.from(a_minus_b);

    if (diffArr.length > 0) {
      await databaseService.updateMarkRemovedEvents(diffArr);
    }
  }

  public async updateEventsAndOrgs() {
    try {
      const timepadEvents = await timepadService.getTimepadData();
      await databaseService.updateEventsAndOrgs(timepadEvents);
      await this.updateRemovedEvents();
      console.log("Synced with Timepad successfully.");
    } catch (error) {
      console.error("Error sync with Timepad:", error);
    }
  }
}
