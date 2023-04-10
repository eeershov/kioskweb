import { format } from "date-fns";
import axios from "axios";
// import * as dotenv from "dotenv";
// dotenv.config();

import { AxiosResponse } from "axios";
import { TimepadEventData } from "../types/types.js";

// import { callHomeDB } from "../controllers/Api.controller.js";
// import { sql } from "../database/db.js";

const TP_API_TOKEN: string = process.env.TP_API_TOKEN as string;
const TP_API_URL: string = process.env.TP_API_URL as string;
const TP_orgIdKiosk: number = parseInt(process.env.TP_orgIdKiosk as string);
const TP_orgIdGrky: number = parseInt(process.env.TP_orgIdGrky as string);
const TP_orgIdStand: number = parseInt(process.env.TP_orgIdStand as string);
const TP_orgId52: number = parseInt(process.env.TP_orgId52 as string);

// import {
//   updateOrganizationsDB,
//   updateEventsDB,
// } from "./Timepad.service.helpers.js";

export default class TimepadService {
  getAxiosConfig(eventsId?: number[]) {
    const org_ids = `${TP_orgIdKiosk},${TP_orgIdGrky},${TP_orgIdStand},${TP_orgId52}`;

    // formating current date to yyyy-MM-dd
    const currentDate = new Date();
    const dateNow = format(currentDate, "yyyy-MM-dd");

    const plFields = [
      "id",
      "location",
      "description_short",
      "description_html",
      "organization",
      "moderation_statuses",
      "tickets_limit",
    ];

    const payload: {
      show_empty_fields: string;
      fields: string[];
      limit: string;
      starts_at_min: string;
      organization_ids: string;
      event_ids?: number[];
    } = {
      show_empty_fields: "false",
      fields: plFields,
      limit: "100",
      starts_at_min: dateNow,
      organization_ids: org_ids,
    };

    if (eventsId) {
      payload["event_ids"] = eventsId;
      payload["starts_at_min"] = "2023-01-01";
    }

    const axios_config = {
      method: "get",
      url: TP_API_URL,
      params: payload,
      headers: {
        Authorization: `Bearer ${TP_API_TOKEN}`,
        "Accept-Encoding": "text/html; charset=UTF-8",
      },
    };
    return axios_config;
  }

  async getTimepadData(): Promise<TimepadEventData[]> {
    try {
      const axios_config = this.getAxiosConfig();
      const response: AxiosResponse<{ values: TimepadEventData[] }> =
        await axios(axios_config);
      return response.data.values;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  // async updateRemovedData() {
  //   const dbData = await callHomeDB();
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

// async function callTimepadAPI() {
//   try {
//     console.log(` [${new Date()}] \nCalling Timepad API`);
//     const response: any = await getTimepadData();
//     // res.send(response.data)
//     const timepadEventsArr = response.data.values;
//     // console.log(response);
//     console.log(` [${new Date()}] \nUpdating data in DB`);
//     updateOrganizationsDB(timepadEventsArr);
//     updateEventsDB(timepadEventsArr);
//   } catch (error) {
//     console.error(error);
//   }
// }

// https://github.com/typescript-eslint/typescript-eslint/blob/v2.28.0/packages/eslint-plugin/docs/rules/no-misused-promises.md

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function tpService() {
//   await delay(1000);
//   console.log("1. update data");
//   await callTimepadAPI();
//   await delay(1000);
//   console.log("2. remove deleted");
//   await updateRemovedData();
// }
