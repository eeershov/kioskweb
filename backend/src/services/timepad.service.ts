import { format } from "date-fns";
import axios from "axios";
import { AxiosResponse } from "axios";

import { TimepadEventData } from "../types/index.js";

const TP_API_TOKEN: string = process.env.TP_API_TOKEN as string;
const TP_API_URL: string = process.env.TP_API_URL as string;
const TP_orgIdKiosk: number = parseInt(process.env.TP_orgIdKiosk as string);
const TP_orgIdGrky: number = parseInt(process.env.TP_orgIdGrky as string);
const TP_orgIdStand: number = parseInt(process.env.TP_orgIdStand as string);
const TP_orgId52: number = parseInt(process.env.TP_orgId52 as string);

export default class TimepadService {
  private getAxiosConfig(eventsId?: number[]) {
    const org_ids = `${TP_orgIdKiosk},${TP_orgIdGrky},${TP_orgIdStand},${TP_orgId52}`;

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

  public async getTimepadData(
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
      return response.data.values;
    } catch (error) {
      console.error(`Axios error: ${error}`);
      throw new Error(`Axios error: ${error}`);
    }
  }
}
