import React, { useContext } from "react";
import { getDay, parse } from "date-fns";

import { ViewportContext } from "../../appContext/ViewportContext";
import { Day } from "./index";


interface WeekEvents {
  weekEvents: Map<string, []>;
  isWeekdayEmpty?: number[];
}

export default function Week({ weekEvents, isWeekdayEmpty }: WeekEvents) {
  console.log("Week");
  const mobOrDesk = useContext(ViewportContext);

  const dateFormat = `d-M-yyyy`;
  const currentDate = new Date();

  const dayIterator = weekEvents.entries()
  let days: JSX.Element[] = [];

  function getWeekDays(): JSX.Element[] {
    const days = [];
    for (const [dateString, events] of dayIterator) {
      const date = parse(dateString, dateFormat, currentDate);
      let isEmpty: boolean = false;
      if (isWeekdayEmpty) {
        isEmpty = (isWeekdayEmpty[getDay(date)] <= 0)
      }
      days.push(
        <Day key={dateString} events={events} date={date} isEmpty={isEmpty} />
      )
    }
    return days;
  }

  days = getWeekDays();

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