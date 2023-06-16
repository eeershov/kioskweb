import { format, subMonths } from "date-fns";
import axios, { AxiosResponse } from "axios";

import { TimepadEventData, AxiosConfig } from "../types/index.js";
import { TP_orgIds } from "../utils/config.js";

const TP_API_TOKEN: string = process.env.TP_API_TOKEN as string;
const TP_API_URL: string = process.env.TP_API_URL as string;

interface Parameters {
  eventsId?: number[];
  gatherPreviousMonths?: number;
}

function getAxiosConfig({
  eventsId,
  gatherPreviousMonths,
}: Parameters): AxiosConfig {
  // getting events by IDs is the (only) way to check if they are still exist
  const org_ids = TP_orgIds.join(",");

  const currentDate = new Date();
  const dateFormat = "yyyy-MM-dd";
  const [dateNow, monthAgo] = [
    format(currentDate, dateFormat),
    format(subMonths(currentDate, 1), dateFormat),
  ];
  let monthGatherFrom;
  if (gatherPreviousMonths) {
    monthGatherFrom = format(
      subMonths(currentDate, gatherPreviousMonths),
      dateFormat
    );
  }

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
    ...(gatherPreviousMonths && { starts_at_min: monthGatherFrom }),
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

export async function getTimepadData({
  eventsId,
  gatherPreviousMonths,
}: Parameters): Promise<TimepadEventData[] | undefined> {
  try {
    let axios_config;
    if (eventsId) {
      axios_config = getAxiosConfig({ eventsId });
    } else if (!eventsId && !gatherPreviousMonths) {
      axios_config = getAxiosConfig({});
    } else {
      axios_config = getAxiosConfig({ gatherPreviousMonths });
    }

    const response: AxiosResponse<{ values: TimepadEventData[] }> = await axios(
      axios_config
    );
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
