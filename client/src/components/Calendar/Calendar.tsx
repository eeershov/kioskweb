import React, { useEffect, useState, useContext } from 'react';
import { ApiService } from '../../services/api.service';
import { setDefaultOptions, format } from "date-fns";
import { ru } from 'date-fns/locale';
import { WeekView, MonthView } from "./index";
import { ViewportContext } from '../../appContext/ViewportContext';

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


function Calendar() {
  console.log("Calendar");
  const mobOrDesk = useContext(ViewportContext);
  const todayDate = new Date();

  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [eventsByDay, setEventsByDay] = useState<Map<string, [] | EventWithOrganizationData[]>>(new Map());

  useEffect(() => {
    let active = true;
    async function fetchData() {
      const dateFormat = `yyyy-MM-dd`;
      const selectedDateString = format(selectedDate, dateFormat);
      ApiService.getCalendarData(selectedDateString).then(response => {
        if (active) {
          console.log(response);
          setEventsByDay(response);
        }
      });
    }
    fetchData();
    return () => {
      active = false;
    };
  }, [selectedDate]);

  const MonthOrWeekView = (mobOrDesk === "Mobile" ? <WeekView eventsByDay={eventsByDay} selectedDate={selectedDate} todayDate={todayDate} /> :
    <MonthView eventsByDay={eventsByDay} setSelectedDate={setSelectedDate} todayDate={todayDate} selectedDate={selectedDate} />)


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