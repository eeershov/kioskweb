import { TimepadService, DatabaseService } from "../services/index.js";

const timepadService = new TimepadService();
const databaseService = new DatabaseService();

export default class SyncService {
  public async updateEventsAndOrgs() {
    try {
      const timepadEvents = await timepadService.getTimepadData();
      await databaseService.updateEventsAndOrgs(timepadEvents);
      console.log("Synced with Timepad successfully.");
    } catch (error) {
      console.error("Error sync with Timepad:", error);
    }
  }

  // private async updateRemovedData() {
  //   // compares events in db with timepad by timepad's ids, marks removed in db
  //   const dbData = await this.getEvents();
  //   const eventsIdStored: number[] = [];
  //   dbData.forEach((element) => {
  //     eventsIdStored.push(element.tp_id);
  //   });

  //   const axios_config = getAxiosConfig(eventsIdStored);
  //   const tpData = await axios(axios_config);
  //   const tpEventsIdList = tpData.data.values;
  //   // console.log(tpEventsIdList)
  //   const eventsIdTp: number[] = [];
  //   tpEventsIdList.forEach((element: any) => {
  //     eventsIdTp.push(element.id);
  //   });

  //   const a = new Set(eventsIdStored);
  //   const b = new Set(eventsIdTp);
  //   const a_minus_b = new Set([...a].filter((x) => !b.has(x)));
  //   const difArr = Array.from(a_minus_b);

  //   await sql`
  //     UPDATE events
  //     SET removed = TRUE
  //     WHERE tp_id IN ${sql(difArr)};
  //   `;
  // }
}
