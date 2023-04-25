import React, { useContext } from 'react';

import { ViewportContext } from '../../appContext/ViewportContext';
import { EventCard } from "./index";

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";
interface Events {
  events: EventWithOrganizationData[] | [];
  isEmpty: boolean;
}

export default function Day({ events, isEmpty }: Events) {
  const mobOrDesk = useContext(ViewportContext);
  const noEvents = {
    mobile: "",
    desktop: "basis-1/12"
  };

  const dayContent = {
    mobile: "Day-content flex-row pb-4",
    desktop: "Day-content basis-2/12 flex"
  };

  if (events.length === 0 && isEmpty) {
    return (
      <div className={mobOrDesk === "Mobile" ? noEvents.mobile : noEvents.desktop}>
        No events
      </div>
    )
  } else if (events.length === 0) {
    return (
      <div className={mobOrDesk === "Mobile" ? dayContent.mobile : dayContent.desktop}>
        No events
      </div>
    )
  }


  return (
    <div className={mobOrDesk === "Mobile" ? dayContent.mobile : dayContent.desktop}>
      {events.map((event, i) => {
        return (
          <EventCard key={i} performance={event} />
        )
      })}
    </div>
  );
}