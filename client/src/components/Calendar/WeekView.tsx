import React, { useState } from 'react';
import { setDefaultOptions, subDays, addDays } from "date-fns";
import { ru } from 'date-fns/locale';

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";
import { Week } from "./index";
import { getWeekEvents } from "./utils";
import ButtonControlStyle from './ButtonControlStyle';

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


interface Props {
  eventsByDay: Map<string, EventWithOrganizationData[] | []>
  selectedDate: Date,
  todayDate: Date,
  filteredOrgs: Map<number, number>,
}

export default function WeekView({ eventsByDay, selectedDate, todayDate, filteredOrgs }: Props) {
  const [dateState, setDateState] = useState(selectedDate); // selected date
  const [isDisabledControls, setIsDisabledControls] = useState({ prev: false, next: false });

  function ControlButton({ option, children }: { option: "prev" | "next" | "current"; children: string }): JSX.Element {
    console.log(option);
    let status = false;
    switch (option) {
      case "prev":
        status = isDisabledControls.prev;
        break;
      case "next":
        status = isDisabledControls.next;
        break;
      default:
        break;
    }
    return (
      <ButtonControlStyle onClick={() => handleClick(option)} disabled={status}>
        {children}
      </ButtonControlStyle>
    );
  }

  function handleClick(option: "prev" | "next" | "current") {
    let optionDate;
    let optionAfterDate;
    if (option === "prev") {
      optionDate = subDays(dateState, 7);
      optionAfterDate = subDays(dateState, 14);
    } else if (option === "next") {
      optionDate = addDays(dateState, 7);
      optionAfterDate = addDays(dateState, 14);
    } else {
      setDateState(selectedDate);
      window.location.href = "#today";
      setIsDisabledControls({ prev: false, next: false });
      return;
    }
    const optionWeek = getWeekEvents(optionDate, eventsByDay);
    const hasEvents = Array.from(optionWeek.values()).some(events => events !== undefined);
    if (!hasEvents) {
      setIsDisabledControls({ prev: option === "prev", next: option === "next" });
      return;
    }

    const optionAfterWeek = getWeekEvents(optionAfterDate, eventsByDay);
    const hasAfterEvents = Array.from(optionAfterWeek.values()).some(events => events !== undefined);
    if (hasAfterEvents) {
      setIsDisabledControls({ prev: false, next: false });
    } else {
      setIsDisabledControls({ prev: option === "prev", next: option === "next" });
    }
    setDateState(optionDate);
  }

  return (
    <div>
      <div className='flex m-1 pt-1'>
        <ControlButton option="prev">
          ❮
        </ControlButton>
        <ControlButton option="current">
          Сегодня
        </ControlButton>
        <ControlButton option="next">
          ❯
        </ControlButton>
      </div>
      {<Week filteredOrgs={filteredOrgs} weekEvents={getWeekEvents(dateState, eventsByDay)} />}
    </div>
  )
}
