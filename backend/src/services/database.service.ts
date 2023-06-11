import {
  parseISO,
  getYear,
  getMonth,
  parse,
  addDays,
  format,
  subDays,
} from "date-fns";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

import { sql } from "../database/database.js";
import {
  TimepadEventData,
  EventWithOrganizationData,
  EventCreationData,
  OrganizationCreationData,
} from "../types/index.js";

const TP_orgIdKiosk: number = parseInt(process.env.TP_orgIdKiosk as string);
const TP_orgIdGrky: number = parseInt(process.env.TP_orgIdGrky as string);
const TP_orgIdStand: number = parseInt(process.env.TP_orgIdStand as string);
const TP_orgId52: number = parseInt(process.env.TP_orgId52 as string);

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export const decodeHtml = (str: string) => {
  // removing &quot;
  const txt = window.document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

const decodeNPurify = (str: string) => {
  return purify.sanitize(decodeHtml(str));
};

export default class DatabaseService {
  public async getOne(): Promise<[{ exists: boolean }]> {
    try {
      const eventsList = await sql<[{ exists: boolean }]>`
      SELECT EXISTS (select * from events);
      `;
      return eventsList;
    } catch (error) {
      throw new Error(`Error getting data from the database.`);
    }
  }
  private async updateEvents(arrTPEvents: TimepadEventData[]) {
    const arrEvents: EventCreationData[] = [];
    for (let i = 0; i < arrTPEvents.length; i++) {
      const event = arrTPEvents[i];

      const tp_starts_at = parseISO(event.starts_at);
      const tp_name = decodeNPurify(event.name);
      const tp_description_short = decodeNPurify(event.description_short);
      const tp_description_html = decodeNPurify(event.description_html);

      const eventCreationData = {
        tp_org_id: event.organization.id,
        tp_id: event.id,
        tp_starts_at,
        tp_name,
        tp_description_short,
        tp_description_html,
        tp_url: event.url,
        tp_poster_image_default_url: event.poster_image?.default_url || null,
      };
      arrEvents.push(eventCreationData);
    }

    try {
      await sql.begin(async (sql) => {
        await sql`
          INSERT INTO events ${sql(arrEvents)}
          ON CONFLICT (tp_id)
          DO
            UPDATE SET
              tp_starts_at = EXCLUDED.tp_starts_at,
              tp_name = EXCLUDED.tp_name,
              tp_description_short = EXCLUDED.tp_description_short,
              tp_description_html = EXCLUDED.tp_description_html,
              tp_url = EXCLUDED.tp_url,
              tp_poster_image_default_url = EXCLUDED.tp_poster_image_default_url,
              updated = CURRENT_TIMESTAMP,
              removed = FALSE
        `;
      });
    } catch (error) {
      console.log(`Error updating events: ${error}`);
      // throw new Error("Error updating events");
    }
  }

  private async updateOrgs(TimepadEvents: TimepadEventData[] | "default") {
    // Org_anizations
    const allOrgs: OrganizationCreationData[] = [];

    if (TimepadEvents === "default") {
      const defaultOrgs = [
        TP_orgIdKiosk,
        TP_orgIdGrky,
        TP_orgIdStand,
        TP_orgId52,
      ];
      for (let i = 0; i < defaultOrgs.length; i++) {
        const orgInfo: OrganizationCreationData = {
          tp_org_id: defaultOrgs[i],
          tp_org_name: "",
          tp_org_description_html: "",
          tp_org_url: "",
          tp_org_logo_image_default_url: "",
          tp_org_subdomain: "",
        };
        allOrgs.push(orgInfo);
      }
    } else {
      for (let i = 0; i < TimepadEvents.length; i++) {
        const event = TimepadEvents[i];
        const orgInfo: OrganizationCreationData = {
          tp_org_id: event.organization.id,
          tp_org_name: event.organization.name,
          tp_org_description_html: event.organization.description_html
            ? decodeNPurify(event.organization.description_html)
            : "",
          tp_org_url: event.organization.url,
          tp_org_logo_image_default_url:
            event.organization.logo_image.default_url,
          tp_org_subdomain: event.organization.subdomain,
        };
        allOrgs.push(orgInfo);
      }
    }

    const uniqueOrgsId: number[] = [];
    const uniqueOrgsArr = allOrgs.filter((org) => {
      if (uniqueOrgsId.indexOf(org.tp_org_id) === -1) {
        uniqueOrgsId.push(org.tp_org_id);
        return org;
      }
    });

    try {
      await sql.begin(async (sql) => {
        await sql`
          INSERT INTO tp_organizations ${sql(uniqueOrgsArr)} 
          ON CONFLICT (tp_org_id)
          DO 
            UPDATE SET 
              tp_org_name = EXCLUDED.tp_org_name,
              tp_org_description_html = EXCLUDED.tp_org_description_html,
              tp_org_url = EXCLUDED.tp_org_url,
              tp_org_logo_image_default_url = EXCLUDED.tp_org_logo_image_default_url,
              tp_org_subdomain = EXCLUDED.tp_org_subdomain,
              updated = CURRENT_TIMESTAMP
        `;
      });
    } catch (error) {
      console.log(`updateOrgs error: ${error}`);
      throw new Error("Error updating orgs.");
    }
  }

  public async updateEventsAndOrgs(TimepadEvents: TimepadEventData[]) {
    await this.updateOrgs(TimepadEvents);
    await this.updateEvents(TimepadEvents);
  }

  public async getEvents(
    date?: string
  ): Promise<EventWithOrganizationData[] | []> {
    const formatString = `yyyy-MM-dd`;
    const currentDate = new Date();
    let periodDate: Date;
    if (date) {
      periodDate = parse(date, formatString, currentDate);
      if (!periodDate.getTime()) {
        throw new Error(
          `Wrong date value: ${date}. Use string in yyyy-MM-dd format.`
        );
      }
    } else {
      periodDate = currentDate;
    }

    const currentYear = getYear(periodDate);
    const currentMonth = getMonth(periodDate) + 1;
    const currentMonthStartDate = parse(
      `${currentYear}-${currentMonth}-01`,
      formatString,
      periodDate
    );
    const periodStartDate = subDays(currentMonthStartDate, 8);
    const periodEndDate = addDays(currentMonthStartDate, 43);

    const periodStartString = format(periodStartDate, formatString);
    const periodEndString = format(periodEndDate, formatString);

    try {
      const eventsList = await sql<EventWithOrganizationData[]>`
        SELECT 
          E.tp_org_id, E.tp_id, E.tp_starts_at, E.tp_name, E.tp_description_short, E.tp_url, E.tp_poster_image_default_url,
          O.tp_org_name, O.tp_org_subdomain, O.tp_org_logo_image_default_url
        FROM events E
          INNER JOIN tp_organizations O 
            ON O.tp_org_id = E.tp_org_id
        WHERE E.tp_starts_at BETWEEN ${periodStartString} AND ${periodEndString}
          AND removed = FALSE
          ORDER BY
            E.tp_starts_at ASC;
      `;
      return eventsList;
    } catch (error) {
      throw new Error(`Error getting data from the database.`);
    }
  }

  public async updateMarkRemovedEvents(removedEventIds: number[]) {
    try {
      await sql.begin(async (sql) => {
        await sql`
          UPDATE events
          SET removed = TRUE
          WHERE tp_id IN ${sql(removedEventIds)};
        `;
      });
    } catch (error) {
      console.log(`Error updateMarkRemovedEvents: ${error}`);
    }
  }
}
