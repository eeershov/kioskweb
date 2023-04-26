import React from 'react';
import { setDefaultOptions, parse, getDay } from "date-fns";
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
  const currentDate = new Date();

  function getWeekInfo(): { isWeekdayEmpty: number[], sundays: string[] } {
    const eventsIter = eventsByDay.entries();
    let i = 0;
    const isWeekdayEmpty = [0, 0, 0, 0, 0, 0, 0];
    const sundays = [];
    for (const [dateString, events] of eventsIter) {
      i++;
      const date = parse(dateString, dateFormat, currentDate);
      isWeekdayEmpty[getDay(date)] += events.length;
      // getting a day from each week for cutting a month into weeks
      if (!(i % 7)) {
        sundays.push(dateString);
      }
    }
    return { isWeekdayEmpty, sundays };
  }
  const weekInfo = getWeekInfo();

  const weeksJSX = [];
  for (let i = 0; i < weekInfo.sundays.length; i++) {
    const dateString = weekInfo.sundays[i];
    const date = parse(dateString, dateFormat, currentDate)
    weeksJSX.push(<Week key={i} weekEvents={getWeekDates(date, eventsByDay)} isWeekdayEmpty={weekInfo.isWeekdayEmpty} option={"month-view"} />)
  }


  return (
    <div className='WeekView
                    flex-row m-0'>
      <p>MonthView!</p>
      <div className='Week flex'>
        <div className='basis-2/12'>ПН</div>
        <div className='basis-2/12'>ВТ</div>
        <div className='basis-2/12'>СР</div>
        <div className='basis-2/12'>ЧТ</div>
        <div className='basis-2/12'>ПТ</div>
        <div className='basis-2/12'>СБ</div>
        <div className='basis-2/12'>ВС</div>
      </div>
      {eventsByDay.size > 0 ?
        <div>
          {weeksJSX}
        </div>
        : "No events"
      }

    </div >
  );
}