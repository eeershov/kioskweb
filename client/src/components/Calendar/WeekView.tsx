import React, { useEffect, useState } from 'react';
import { format, setDefaultOptions, previousMonday, isMonday } from "date-fns";
import { ru } from 'date-fns/locale';

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";
import { Day } from "./index";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


interface Events {
  events: EventWithOrganizationData[] | []
}

export default function WeekView({ events }: Events) {
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    // Get the dates for the current week
    // From Monday to Sunday
    const currentDate = new Date();
    let theDay: Date;
    if (isMonday(currentDate)) {
      theDay = currentDate;
    } else {
      theDay = previousMonday(currentDate);
    }
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(theDay);
      date.setDate(date.getDate() + i);
      return date;
    });
    setWeekDates(dates);
  }, []);

  return (
    <div className='Week
                    flex-row
                    m-0'>
      {weekDates.map((weekDate, index) => {
        // Filter events for the current date
        const dateEvents = events.filter((event) => {
          const eventDate = new Date(event.tp_starts_at);
          return (
            eventDate.getDate() === weekDate.getDate() &&
            eventDate.getMonth() === weekDate.getMonth() &&
            eventDate.getFullYear() === weekDate.getFullYear()
          );
        });
        return (
          <div key={index} className='pb-2'>
            <h3 className='text-center self-center uppercase font-bold text-sm p-2'>
              {format(weekDate, 'EEEE, MMMM d')}
            </h3>
            {<Day events={dateEvents} />}
          </div>
        );
      })}
    </div>
  );
}