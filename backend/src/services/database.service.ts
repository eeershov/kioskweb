import { sql } from "../database/database.js";
import { TimepadEventData } from "../types/types.js";

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
}
