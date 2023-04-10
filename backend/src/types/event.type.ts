type EventInfo = {
  id: number;
  tp_org_id: number;
  day_num: number;
  week_num: number;
  tp_id: number;
  tp_starts_at: Date;
  tp_name: string;
  tp_description_short: string;
  tp_description_html: string;
  tp_url: string;
  tp_poster_image_default_url: string;
  created: Date;
  updated: Date;
  removed: boolean;
};

export { EventInfo };
