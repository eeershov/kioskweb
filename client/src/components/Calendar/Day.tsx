import React from 'react';

import EventCard from "./EventCard";

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";
interface Events {
  events: EventWithOrganizationData[] | []
}

export default function Day({ events }: Events) {
  if (events.length === 0) {
    return (
      <div>
        Day is empty
      </div>
    )
  }
  return (
    <div>
      {events.map((event, i) => {
        return (
          <EventCard key={i} performance={event} />
        )
      })}
    </div>
  );
}