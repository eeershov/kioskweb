import { EventData } from "./event.type.js";
import { OrganizationData } from "./organization.type.js";

export type EventWithOrganizationData = EventData & OrganizationData;

export { TimepadEventData } from "./timepad.type.js";
export { OrganizationCreationData } from "./organization.type.js";
export { EventCreationData, EventData } from "./event.type.js";
