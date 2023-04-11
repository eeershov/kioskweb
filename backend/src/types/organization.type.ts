type OrganizationCreationData = {
  tp_org_id: number;
  tp_org_name: string;
  tp_org_description_html: string;
  tp_org_url: string;
  tp_org_logo_image_default_url: string;
  tp_org_subdomain: string;
};

type DatabaseGenerated = {
  id: number;
  updated: Date;
};

type OrganizationData = OrganizationCreationData & DatabaseGenerated;

export { OrganizationCreationData, OrganizationData };
