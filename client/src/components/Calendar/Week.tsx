import React, { useEffect, useState } from 'react';
import { format, setDefaultOptions } from "date-fns";
import { ru } from 'date-fns/locale';

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


interface Events {
  events: EventWithOrganizationData[] | []
}

export default function Week(props: Events) {
  const { events } = props;
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    // Get the dates for the current week
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i - currentDay + 1);
      return date;
    });
    setWeekDates(dates);
  }, []);

  return (
    <div>
      {weekDates.map((date, index) => {
        // Filter events for the current date
        const dateEvents = events.filter((event) => {
          const eventDate = new Date(event.tp_starts_at);
          return (
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
          );
        });

        return (
          <div key={index}>
            <h3>{format(date, 'EEEE, MMMM d')}</h3>
            {dateEvents.length > 0 ? (
              <ul>
                {dateEvents.map((event, index) => (
                  <li key={index}>{event.tp_name}</li>
                ))}
              </ul>
            ) : (
              <p>No events for this day</p>
            )}
          </div>
        );
      })}
    </div>
  );
}