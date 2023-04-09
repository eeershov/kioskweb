import { sql } from "../database/database.js";
import { TimepadEventData } from "../types/types.js";

const TP_orgIdKiosk: number = parseInt(process.env.TP_orgIdKiosk as string);
const TP_orgIdGrky: number = parseInt(process.env.TP_orgIdGrky as string);
const TP_orgIdStand: number = parseInt(process.env.TP_orgIdStand as string);
const TP_orgId52: number = parseInt(process.env.TP_orgId52 as string);

export default class DatabaseService {
  async updateEvents(arrTPEvents: TimepadEventData[]) {
    const arrEvents = [];
    for (let i = 0; i < arrTPEvents.length; i++) {
      const event = arrTPEvents[i];
      console.log(event);
      const eventData = {
        tp_org_id: event.organization.id,
        day_num: 123, // can do without it
        week_num: 123, // can do without it
        tp_id: event.id,
        tp_starts_at: event.starts_at,
        tp_name: event.name,
        tp_description_short: event.description_short,
        tp_description_html: event.description_html,
        tp_url: event.url,
        tp_poster_image_default_url: event.poster_image?.default_url || null,
      };
      arrEvents.push(eventData);
      console.log(arrEvents);
    }
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
          updated = CURRENT_TIMESTAMP
    `;
  }

  async updateOrgs(TimepadEvents: TimepadEventData[] | "default") {
    // Org_anizations
    const allOrgs = [];

    if (TimepadEvents === "default") {
      const defaultOrgs = [
        TP_orgIdKiosk,
        TP_orgIdGrky,
        TP_orgIdStand,
        TP_orgId52,
      ];
      for (let i = 0; i < defaultOrgs.length; i++) {
        const orgInfo = {
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
        const orgInfo = {
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
  }

  async syncTimepad(TimepadEvents: TimepadEventData[]) {
    await this.updateOrgs(TimepadEvents);
    await this.updateEvents(TimepadEvents);
  }
}
