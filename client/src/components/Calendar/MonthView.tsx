import React, { Dispatch, SetStateAction } from 'react';
import { setDefaultOptions, parse, getDay, subDays, addDays } from "date-fns";
import { ru } from 'date-fns/locale';
import { Week } from "./index";
import { getWeekEvents } from "./utils";

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });

interface Props {
  eventsByDay: Map<string, EventWithOrganizationData[] | []>,
  selectedDate: Date,
  setSelectedDate: Dispatch<SetStateAction<Date>>,
  todayDate: Date
}


export default function MonthView({ eventsByDay, selectedDate, setSelectedDate, todayDate }: Props) {
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
    weeksJSX.push(<Week key={i} weekEvents={getWeekEvents(date, eventsByDay)} isWeekdayEmpty={weekInfo.isWeekdayEmpty} />)
  }

  function handleClick(option: "prev" | "next") {
    if (option === "prev") {
      setSelectedDate(
        subDays(selectedDate, 31)
      )
    } else {
      setSelectedDate(
        addDays(selectedDate, 31)
      )
    }
  }

  function ControlButton({ option, children }: { option: "prev" | "next"; children: string }): JSX.Element {
    console.log(option);
    let status = false;
    // if (option === "prev") {
    //   status = isDisabledControls.prev;
    // } else {
    //   status = isDisabledControls.next;
    // }
    return (
      <button onClick={() => handleClick(option)} disabled={status} className='bg-slate-500 disabled:bg-stone-500'>
        {children}
      </button>
    );
  }

  return (
    <div className='WeekView
                    flex-row m-0'>
      <p>MonthView!</p>
      <ControlButton option='prev'>
        Предыдущий месяц
      </ControlButton>
      <ControlButton option='next'>
        Следующий месяц
      </ControlButton>
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