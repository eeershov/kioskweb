import React, { useContext } from "react";
import { getDay, parse } from "date-fns";

import { ViewportContext } from "../../appContext/ViewportContext";
import { Day } from "./index";


interface WeekEvents {
  weekEvents: Map<string, []>;
  isWeekdayEmpty?: number[];
  isCurrentWeek?: boolean;
  filteredOrgs: Map<number, number>;
}

export default function Week({ weekEvents, isWeekdayEmpty, isCurrentWeek, filteredOrgs }: WeekEvents) {
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
        <Day key={dateString} events={events} date={date} isEmpty={isEmpty} filteredOrgs={filteredOrgs} />
      )
    }
    return days;
  }

  days = getWeekDays();

  const weekContent = {
    mobile: "Week flex-col",
    desktop: "Week flex justify-center",
    currentMobile: "",
    currentDesktop: "ring-2 rounded-xl ring-violet-400 dark:ring-purple-500 shadow-xl",
  };

  let sumClassName: string[] = [];
  if (mobOrDesk === "Mobile") {
    sumClassName.push(weekContent.mobile);
  } else {
    sumClassName.push(weekContent.desktop);
    if (isCurrentWeek) {
      sumClassName.push(weekContent.currentDesktop)
    }
  }

  return (
    <div className={sumClassName.join(" ")}>
      {days}
    </div>
  )
}