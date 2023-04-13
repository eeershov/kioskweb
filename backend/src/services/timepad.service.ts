import { format, subMonths } from "date-fns";
import axios from "axios";
import { AxiosResponse } from "axios";

import { TimepadEventData, AxiosConfig } from "../types/index.js";

const TP_API_TOKEN: string = process.env.TP_API_TOKEN as string;
const TP_API_URL: string = process.env.TP_API_URL as string;
const TP_orgIds = [
  parseInt(process.env.TP_orgIdKiosk as string),
  parseInt(process.env.TP_orgIdGrky as string),
  parseInt(process.env.TP_orgIdStand as string),
  parseInt(process.env.TP_orgId52 as string),
];

export default class TimepadService {
  private static getAxiosConfig(eventsId?: number[]): AxiosConfig {
    // getting events by IDs is the (only) way to check if they are still exist
    const org_ids = TP_orgIds.join(",");

    const currentDate = new Date();
    const dateFormat = "yyyy-MM-dd";
    const [dateNow, monthAgo] = [
      format(currentDate, dateFormat),
      format(subMonths(currentDate, 1), dateFormat),
    ];

    const fields = [
      "id",
      "location",
      "description_short",
      "description_html",
      "organization",
      "moderation_statuses",
      "tickets_limit",
    ];

    const payload = {
      show_empty_fields: false,
      fields,
      limit: 100, // 100 is max
      starts_at_min: dateNow,
      organization_ids: org_ids,
      ...(eventsId && {
        event_ids: eventsId,
        starts_at_min: monthAgo,
      }),
    };

    return {
      method: "get",
      url: TP_API_URL,
      params: payload,
      headers: {
        Authorization: `Bearer ${TP_API_TOKEN}`,
        "Accept-Encoding": "text/html; charset=UTF-8",
      },
    };
  }

  public static async getTimepadData(
    eventsId?: number[]
  ): Promise<TimepadEventData[] | undefined> {
    try {
      let axios_config;
      if (eventsId) {
        axios_config = this.getAxiosConfig(eventsId);
      } else {
        axios_config = this.getAxiosConfig();
      }
      const response: AxiosResponse<{ values: TimepadEventData[] }> =
        await axios(axios_config);
      const values = response.data.values;
      if (values) {
        return values;
      } else {
        console.log(
          `response.data.values from Timepad is undefined: ${response}`
        );
        return [];
      }
    } catch (error) {
      throw new Error(`Axios error: ${error}`);
    }
  }
}
