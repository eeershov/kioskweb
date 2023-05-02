import React, { useContext } from "react";
import { format, getDay, parse } from "date-fns";

import { ViewportContext } from "../../appContext/ViewportContext";
import { Day } from "./index";


interface WeekEvents {
  weekEvents: Map<string, []>;
  option: "month-view" | "week-view";
  isWeekdayEmpty?: number[];
}

export default function Week({ weekEvents, option, isWeekdayEmpty }: WeekEvents) {
  console.log("Week");
  const mobOrDesk = useContext(ViewportContext);

  const dateFormat = `d-M-yyyy`;
  const currentDate = new Date();

  const dayIterator = weekEvents.entries()
  let days: JSX.Element[] = [];

  function getWeekDays(option: "month-view" | "week-view"): JSX.Element[] {
    const days = [];
    for (const [dateString, events] of dayIterator) {
      const date = parse(dateString, dateFormat, currentDate);
      const dateFormatted = format(date, 'EEEE, MMMM d');
      let isEmpty: boolean = false;
      if (isWeekdayEmpty) {
        isEmpty = (isWeekdayEmpty[getDay(date)] <= 0)
      }
      days.push(
        <>
          {(option === "week-view") ? <h3 className='text-center self-center uppercase font-bold text-sm p-2'>
            {dateFormatted}
          </h3> : null}
          {<Day key={dateString} events={events} date={date} isEmpty={isEmpty} />}
        </>
      )
    }
    return days;
  }

  if (option === "month-view") {
    days = getWeekDays("month-view");
  } else {
    days = getWeekDays("week-view");
  }

  const weekContent = {
    mobile: "Week flex-col",
    desktop: "Week flex justify-center"
  };

  return (
    <div className={mobOrDesk === "Mobile" ? weekContent.mobile : weekContent.desktop}>
      {days}
    </div>
  )
}