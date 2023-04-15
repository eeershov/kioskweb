type EventData = {
  id: number;
  created: Date;
  updated: Date;
  removed: boolean;
  tp_org_id: number;
  day_num: number;
  week_num: number;
  tp_id: number;
  tp_starts_at: Date;
  tp_name: string;
  tp_description_short: string;
  tp_description_html: string;
  tp_url: string;
  tp_poster_image_default_url: string | null;
};

type OrganizationData = {
  id: number;
  updated: Date;
  tp_org_id: number;
  tp_org_name: string;
  tp_org_description_html: string;
  tp_org_url: string;
  tp_org_logo_image_default_url: string;
  tp_org_subdomain: string;
};

export type EventWithOrganizationData = EventData & OrganizationData;