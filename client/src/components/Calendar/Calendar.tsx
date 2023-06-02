import React, { useEffect, useState, useContext } from 'react';
import { ApiService } from '../../services/api.service';
import { setDefaultOptions, format } from "date-fns";
import { ru } from 'date-fns/locale';
import { WeekView, MonthView } from "./index";
import Loading from "../Elements/Loading";
import { ViewportContext } from '../../appContext/ViewportContext';

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


function Calendar() {
  console.log("Calendar");
  const mobOrDesk = useContext(ViewportContext);
  const todayDate = new Date();

  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [eventsByDay, setEventsByDay] = useState<Map<string, [] | EventWithOrganizationData[]>>(new Map());

  useEffect(() => {
    let active = true;
    async function fetchData() {
      setLoading(true);
      const dateFormat = `yyyy-MM-dd`;
      const selectedDateString = format(selectedDate, dateFormat);
      ApiService.getCalendarData(selectedDateString).then(response => {
        if (active) {
          setEventsByDay(response);
          setLoading(false);
        }
      });
    }
    fetchData();
    return () => {
      active = false;
    };
  }, [selectedDate]);

  const MonthOrWeekView = () => (mobOrDesk === "Mobile" ? <WeekView eventsByDay={eventsByDay} selectedDate={selectedDate} todayDate={todayDate} /> :
    <MonthView eventsByDay={eventsByDay} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />)


  return (
    <div className='Calendar max-w-7xl grow flex self-center justify-center'>
      {loading ?
        <Loading />
        :
        <MonthOrWeekView />
      }
    </div>
  );
}


export default Calendar;