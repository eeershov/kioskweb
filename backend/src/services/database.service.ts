import { parseISO } from "date-fns";

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

export default class DatabaseService {
  private async updateEvents(arrTPEvents: TimepadEventData[]) {
    const arrEvents: EventCreationData[] = [];
    for (let i = 0; i < arrTPEvents.length; i++) {
      const event = arrTPEvents[i];
      const starts_at = parseISO(event.starts_at);

      const eventCreationData = {
        tp_org_id: event.organization.id,
        day_num: 123, // can do without it
        week_num: 123, // can do without it
        tp_id: event.id,
        tp_starts_at: starts_at,
        tp_name: event.name,
        tp_description_short: event.description_short,
        tp_description_html: event.description_html,
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
              day_num = EXCLUDED.day_num,
              week_num = EXCLUDED.week_num,
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
          tp_org_description_html: event.organization.description_html || "",
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
      // throw new Error("Error updating orgs");
    }
  }

  public async updateEventsAndOrgs(TimepadEvents: TimepadEventData[]) {
    await this.updateOrgs(TimepadEvents);
    await this.updateEvents(TimepadEvents);
  }

  public async getEvents(): Promise<EventWithOrganizationData[] | []> {
    try {
      const eventsList = await sql<EventWithOrganizationData[]>`
        SELECT E.*, O.tp_org_name, O.tp_org_subdomain, O.tp_org_logo_image_default_url
        FROM events E
          INNER JOIN tp_organizations O 
            ON O.tp_org_id = E.tp_org_id
        WHERE E.tp_starts_at BETWEEN CURRENT_DATE-40 AND CURRENT_DATE+10 
          AND removed = FALSE
          ORDER BY
            E.tp_starts_at ASC;
      `;
      return eventsList;
    } catch (error) {
      console.log(`Error getting data from DB, ${error}`);
      return [];
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
