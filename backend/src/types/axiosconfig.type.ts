export type AxiosConfig = {
  method: "get";
  url: string;
  params: Payload;
  headers: {
    Authorization: `Bearer ${string}`;
    "Accept-Encoding": "text/html; charset=UTF-8";
  };
};

type Payload = {
  show_empty_fields: boolean;
  fields: string[];
  limit: number;
  organization_ids: string;
  starts_at_min: string;
  event_ids?: number[];
};
