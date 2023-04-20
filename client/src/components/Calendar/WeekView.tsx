import React, { useEffect, useState } from 'react';
import { format, setDefaultOptions, parse, subDays, addDays } from "date-fns";
import { ru } from 'date-fns/locale';

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";
import { Week } from "./index";
import { getWeekDates } from "./utils";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


interface EventsByDay {
  eventsByDay: Map<string, EventWithOrganizationData[] | []>
}

export default function WeekView({ eventsByDay }: EventsByDay) {
  const [dateState, setDateState] = useState(new Date());
  const [weekState, setWeekState] = useState(getWeekDates(dateState, eventsByDay));
  const [disabledControls, setDisabledControls] = useState({ prev: false, next: false });

  useEffect(() => {
    setWeekState(getWeekDates(dateState, eventsByDay))
  }, [dateState, eventsByDay])

  function ControlButton({ option, children }: { option: "prev" | "next"; children: string }): JSX.Element {
    console.log(option);
    let status = false;
    if (option === "prev") {
      status = disabledControls.prev;
    } else {
      status = disabledControls.next;
    }
    return (
      <button onClick={() => handleControl(option)} disabled={status}>
        {children}
      </button>
    );
  }

  function handleControl(option: "prev" | "next") {
    let newDate;
    if (option === "prev") {
      newDate = subDays(dateState, 7);
    } else {
      newDate = addDays(dateState, 7);
    }
    const newWeek = getWeekDates(newDate, eventsByDay);
    const hasEvents = Array.from(newWeek.values()).some(events => events !== undefined);
    if (hasEvents) {
      setDateState(newDate);
      setDisabledControls({ prev: false, next: false });
    } else {
      setDisabledControls({ prev: option === "prev", next: option === "next" });
    }
  }

  return (
    <div>
      <div>
        <ControlButton option={"prev"}>
          prev
        </ControlButton>
        <ControlButton option={"next"}>
          next
        </ControlButton>
      </div>
      {<Week weekEvents={weekState} option={"week-view"} />}
    </div>
  )
}