type TimepadEventData = {
  id: number;
  starts_at: string;
  name: string;
  description_short: string;
  description_html: string;
  url: string;
  poster_image: { default_url: string; uploadcare_url: string };
  location: { country: string; city: string; location: string };
  organization: {
    id: number;
    name: string;
    description_html?: string;
    url: string;
    logo_image: {
      default_url: string;
      uploadcare_url: string;
    };
    subdomain: string;
    permissions?: [
      "Администрирование",
      "Списки участников",
      "Рассылки",
      "Финансовая информация"
    ];
  };
  categories: [
    | {
        id: number;
        name: string;
      }
    | {
        id: number;
        name: string;
      }[]
  ];
  tickets_limit: number;
  moderation_status: string;
};

export { TimepadEventData };
