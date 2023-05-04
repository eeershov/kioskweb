import React, { useState } from 'react';
import { setDefaultOptions, subDays, addDays } from "date-fns";
import { ru } from 'date-fns/locale';

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";
import { Week } from "./index";
import { getWeekEvents } from "./utils";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


interface EventsByDay {
  eventsByDay: Map<string, EventWithOrganizationData[] | []>
}

export default function WeekView({ eventsByDay }: EventsByDay) {
  const [dateState, setDateState] = useState(new Date());
  const [isDisabledControls, setIsDisabledControls] = useState({ prev: false, next: false });

  function ControlButton({ option, children }: { option: "prev" | "next"; children: string }): JSX.Element {
    console.log(option);
    let status = false;
    if (option === "prev") {
      status = isDisabledControls.prev;
    } else {
      status = isDisabledControls.next;
    }
    return (
      <button onClick={() => handleClick(option)} disabled={status} className='bg-slate-500 disabled:bg-stone-500'>
        {children}
      </button>
    );
  }

  function handleClick(option: "prev" | "next") {
    let optionDate;
    let optionFutureDate;
    if (option === "prev") {
      optionDate = subDays(dateState, 7);
      optionFutureDate = subDays(dateState, 14);
    } else {
      optionDate = addDays(dateState, 7);
      optionFutureDate = addDays(dateState, 14);
    }
    const optionFutureWeek = getWeekEvents(optionFutureDate, eventsByDay);
    const hasEvents = Array.from(optionFutureWeek.values()).some(events => events !== undefined);
    if (hasEvents) {
      setIsDisabledControls({ prev: false, next: false });
    } else {
      setIsDisabledControls({ prev: option === "prev", next: option === "next" });
    }
    setDateState(optionDate);
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
      {<Week weekEvents={getWeekEvents(dateState, eventsByDay)} option={"week-view"} />}
    </div>
  )
}