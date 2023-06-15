import React, { useEffect, useState, useContext } from 'react';
import { ApiService } from '../../services/api.service';
import { setDefaultOptions, format } from "date-fns";
import { ru } from 'date-fns/locale';
import { WeekView, MonthView } from "./index";
import Loading from "../Elements/Loading";
import { ViewportContext } from '../../appContext/ViewportContext';
import OrgsFilter from '../OrgsFilter/OrgsFilter';
import DarkModeSwitch from "../DarkModeSwitch/Switcher"


import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });


function Calendar() {
  console.log("Calendar");
  const mobOrDesk = useContext(ViewportContext);
  const todayDate = new Date();

  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [eventsByDay, setEventsByDay] = useState<Map<string, [] | EventWithOrganizationData[]>>(new Map());
  const [filteredOrgs, setOrgsFilterState] = useState<Map<number, number>>(new Map());
  const [isPressed, setIsPressed] = useState(false);
  const idKiosk = 237025;


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


  const MonthOrWeekView = () => (
    mobOrDesk === "Mobile" ?
      <WeekView filteredOrgs={filteredOrgs} eventsByDay={eventsByDay} selectedDate={selectedDate} todayDate={todayDate} />
      :
      <MonthView filteredOrgs={filteredOrgs} eventsByDay={eventsByDay} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
  );


  function handleOnlyKioskClick() {
    if (isPressed) {
      setOrgsFilterState((prev) => {
        prev.delete(idKiosk);
        return prev;
      });
      setIsPressed(false);
    } else {
      setOrgsFilterState(new Map([[idKiosk, idKiosk]]))
      setIsPressed(true)
    }
  }

  return (
    <div className='Calendar max-w-7xl grow flex flex-col self-center w-full'>
      {mobOrDesk === 'Mobile' ? <div className='absolute p-2 -translate-y-[2px]'><DarkModeSwitch />
      </div> : null}
      <OrgsFilter handleOnlyKioskClick={handleOnlyKioskClick} isPressed={isPressed} />
      {loading ?
        <Loading />
        :
        <MonthOrWeekView />
      }
    </div>
  );
}


export default Calendar;
