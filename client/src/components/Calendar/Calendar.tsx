import React, { useEffect, useState, useContext } from 'react';
import { ApiService } from '../../services/api.service';
import { format, setDefaultOptions, previousMonday, isMonday, isFirstDayOfMonth, parse } from "date-fns";
import { ru } from 'date-fns/locale';
import { WeekView, MonthView } from "./index";
import { ViewportContext } from '../../appContext/ViewportContext';

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


function Calendar() {
  console.log("Calendar");
  const mobOrDesk = useContext(ViewportContext);

  const [eventsByDay, setEventsByDay] = useState<Map<string, [] | EventWithOrganizationData[]>>(new Map());

  useEffect(() => {
    let active = true;
    async function fetchData() {
      ApiService.getCalendarData().then(response => {
        if (active) {
          setEventsByDay(response);
        }
      });
    }
    fetchData();
    return () => {
      active = false;
    };
  }, []);

  const MonthOrWeekView = (mobOrDesk === "Mobile" ? <WeekView eventsByDay={eventsByDay} /> : <MonthView eventsByDay={eventsByDay} />)


  return (
    <div className='Calendar'>
      {eventsByDay.size > 0 ? (
        <div className='max-w-7xl m-auto'>
          {MonthOrWeekView}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default Calendar;