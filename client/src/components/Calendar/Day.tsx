import React from 'react';

import { EventCard } from "./index";

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
    <div className='Day-content
                    flex-row
                    pb-4
                    '>
      {events.map((event, i) => {
        return (
          <EventCard key={i} performance={event} />
        )
      })}
    </div>
  );
}