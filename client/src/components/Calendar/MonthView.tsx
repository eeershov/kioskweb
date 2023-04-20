import React, { useEffect, useState } from 'react';
import { format, setDefaultOptions, previousMonday, isMonday, addDays, parse } from "date-fns";
import { ru } from 'date-fns/locale';
import { Week } from "./index";
import { getWeekDates } from "./utils";

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });

interface EventsByDay {
  eventsByDay: Map<string, EventWithOrganizationData[] | []>
}

export default function MonthView({ eventsByDay }: EventsByDay) {
  console.log("MonthView");
  const dateFormat = `d-M-yyyy`;

  function getSundays({ eventsByDay }: EventsByDay): string[] {
    const eventsIter = eventsByDay.keys();

    let i = 0;
    const sundays = [];
    for (const dateString of eventsIter) {
      i++;
      if (!(i % 7)) {
        sundays.push(dateString);
      }
    }
    return sundays;
  }
  const currentDate = new Date();
  const sundays = getSundays({ eventsByDay });

  const weeksJSX = [];
  for (let i = 0; i < sundays.length; i++) {
    const dateString = sundays[i];
    const date = parse(dateString, dateFormat, currentDate)
    weeksJSX.push(<Week weekEvents={getWeekDates(date, eventsByDay)} option={"month-view"} />)
  }


  return (
    <div className='WeekView
                    flex-row m-0'>
      <p>MonthView!</p>
      {eventsByDay.size > 0 ?
        <div>
          {weeksJSX}
        </div>
        : "pepepe"}

    </div>
  );
}