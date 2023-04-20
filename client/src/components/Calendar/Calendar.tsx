import React, { useEffect, useState } from 'react';
import { ApiService } from '../../services/api.service';
import { format, setDefaultOptions, previousMonday, isMonday, isFirstDayOfMonth, parse } from "date-fns";
import { ru } from 'date-fns/locale';
import { WeekView, MonthView } from "./index";

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });

// interface EventsData {
//   data: EventWithOrganizationData[] | []
// }

function Calendar() {
  console.log("Calendar")
  const [dataState, setDataState] = useState<EventWithOrganizationData[] | [] | "Error">([]);
  const [eventsByDayState, setEventsByDayState] = useState<Map<string, [] | EventWithOrganizationData[]>>(new Map());

  useEffect(() => {
    let active = true;
    async function fetchData() {
      ApiService.getEvents().then(response => {
        if (active) {
          setDataState(response);
        }
      });
    }
    fetchData();
    return () => {
      active = false;
    };
  }, []); // Or [] if effect doesn't need props or state


  useEffect(() => {
    let active = true;
    function convertToMap(data: EventWithOrganizationData[] | [] | "Error") {
      // Get the dates for the current month (6 weeks)
      // From first week of the month, from Monday to Sunday
      if (data === "Error") {
        return;
      }

      const currentDate = new Date();
      let theDay: Date;
      let firstDayOfM: Date;
      if (isFirstDayOfMonth(currentDate) && isMonday(currentDate)) {
        theDay = currentDate;
      } else {
        const dateString = `1-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        firstDayOfM = parse(dateString, `d-M-yyyy`, currentDate);
        if (isMonday(firstDayOfM)) {
          theDay = firstDayOfM;
        } else {
          theDay = previousMonday(firstDayOfM);
        }
      }
      const monthDates = Array.from({ length: 42 }, (_, i) => {
        const date = new Date(theDay);
        date.setDate(date.getDate() + i);
        return date;
      });
      const eventsByDay: Map<string, EventWithOrganizationData[] | []> = new Map()
      monthDates.map((monthDate, index) => {
        // Filter events for the current date
        const dateEvents = data.filter((event) => {
          const eventDate = new Date(event.tp_starts_at);
          return (
            eventDate.getDate() === monthDate.getDate() &&
            eventDate.getMonth() === monthDate.getMonth() &&
            eventDate.getFullYear() === monthDate.getFullYear()
          );
        });
        return eventsByDay.set(format(monthDate, `d-M-yyyy`), dateEvents);
      })
      if (active) {
        setEventsByDayState(eventsByDay);
      }
    }
    if (dataState.length > 0) {
      convertToMap(dataState);
    }
    return () => {
      active = false;
    }
  }, [dataState]);

  return (
    <div className='Calendar'>
      {eventsByDayState.size > 0 ? (
        <div>
          <MonthView eventsByDay={eventsByDayState} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default Calendar;