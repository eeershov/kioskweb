import React, { useEffect, useState } from 'react';
import { format, setDefaultOptions, previousMonday, isMonday, addDays, isFirstDayOfMonth, parse, set as dateSet } from "date-fns";
import { ru } from 'date-fns/locale';
import { Week } from "./index";

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });

interface EventsByDay {
  eventsByDay: Map<string, EventWithOrganizationData[] | []>
}

export default function MonthView({ eventsByDay }: EventsByDay) {
  // const [monthDates, setMonthDates] = useState<Date[]>([]);
  console.log("MonthView");
  console.log(eventsByDay);


  function getWeekDates(date: Date, map: Map<string, any>): Map<Date, any> {
    // check to what week date is belong
    // const dateZeroHours = dateSet(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
    const dateFormat = `d-M-yyyy`;
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
      weekDates.set(dateToRecieve, events);
    }

    return weekDates;
  }

  const currentDate = new Date();
  const firstDate = eventsByDay.entries().next().value[0];
  console.log(firstDate)
  const thisWeekEvents = getWeekDates(currentDate, eventsByDay);
  console.log("thisWeekEvents", thisWeekEvents);


  return (
    <div className='Week
                    flex-row
                    m-0'>
      <p>MonthView!</p>
      {eventsByDay.size > 0 ? <Week weekEvents={getWeekDates(new Date(), eventsByDay)} /> : "pepepe"}

    </div>
  );
}