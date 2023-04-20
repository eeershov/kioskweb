import React, { useEffect, useState } from 'react';
import { format, setDefaultOptions, previousMonday, isMonday, addDays, parse } from "date-fns";
import { ru } from 'date-fns/locale';
import { Week } from "./index";

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });

interface EventsByDay {
  eventsByDay: Map<string, EventWithOrganizationData[] | []>
}

export default function MonthView({ eventsByDay }: EventsByDay) {
  console.log("MonthView");
  const dateFormat = `d-M-yyyy`;

  function getWeekDates(date: Date, map: Map<string, any>): Map<string, any> {
    // check to what week date is belong
    const dateString = format(date, dateFormat);
    const dateType = parse(dateString, dateFormat, new Date())
    const weekDates = new Map();

    let weekStartDay;
    if (isMonday(dateType)) {
      weekStartDay = dateType;
    } else {
      weekStartDay = previousMonday(dateType);
    }

    for (let i = 0; i < 7; i++) {
      const dateToRecieve = addDays(weekStartDay, i);
      const dateString = format(dateToRecieve, dateFormat);
      const events = map.get(dateString);
      console.log(events);
      weekDates.set(dateString, events);
    }

    return weekDates;
  }

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
  console.log(sundays);
  const weeksJSX = [];
  for (let i = 0; i < sundays.length; i++) {
    const dateString = sundays[i];
    const date = parse(dateString, dateFormat, currentDate)
    weeksJSX.push(<Week weekEvents={getWeekDates(date, eventsByDay)} />)
  }


  return (
    <div className='Week
                    flex-row
                    m-0'>
      <p>MonthView!</p>
      {eventsByDay.size > 0 ?
        <div>
          {weeksJSX}
        </div>
        : "pepepe"}

    </div>
  );
}