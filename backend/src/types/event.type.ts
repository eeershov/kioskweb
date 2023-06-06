type EventCreationData = {
  tp_org_id: number;
  tp_id: number;
  tp_starts_at: Date;
  tp_name: string;
  tp_description_short: string;
  tp_description_html: string;
  tp_url: string;
  tp_poster_image_default_url: string | null;
};

type DatabaseGenerated = {
  id: number;
  created: Date;
  updated: Date;
  removed: boolean;
};

type EventData = EventCreationData & DatabaseGenerated;

export { EventCreationData, EventData };
