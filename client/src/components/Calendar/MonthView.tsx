import React, { Dispatch, SetStateAction } from 'react';
import { setDefaultOptions, parse, getDay, subDays, addDays, format, differenceInDays, isSameDay } from "date-fns";
import { ru } from 'date-fns/locale';
import { Week } from "./index";
import { getWeekEvents } from "./utils";
import ButtonControlStyle from "./ButtonControlStyle";

import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

setDefaultOptions({ locale: ru, weekStartsOn: 1 });

interface Props {
  eventsByDay: Map<string, EventWithOrganizationData[] | []>,
  selectedDate: Date,
  setSelectedDate: Dispatch<SetStateAction<Date>>,
  filteredOrgs: Map<number, number>,
}


export default function MonthView({ eventsByDay, selectedDate, setSelectedDate, filteredOrgs }: Props) {
  const dateFormat = `d-M-yyyy`;
  const currentDate = new Date();

  function getWeekInfo(): { isWeekdayEmpty: number[], sundays: string[] } {
    const eventsIter = eventsByDay.entries();
    let i = 0;
    const isWeekdayEmpty = [0, 0, 0, 0, 0, 0, 0];
    const sundays = [];
    for (const [dateString, events] of eventsIter) {
      i++;
      const date = parse(dateString, dateFormat, currentDate);
      isWeekdayEmpty[getDay(date)] += events.length;
      // getting a day from each week for cutting a month into weeks
      if (!(i % 7)) {
        sundays.push(dateString);
      }
    }
    // const isWeekdayEmpty = weekdayNumberEvents.map(number => number<=0); 

    return { isWeekdayEmpty, sundays };
  }
  const weekInfo = getWeekInfo();

  const currentDateMidnight = parse(format(currentDate, dateFormat), dateFormat, currentDate);
  const weeksJSX = weekInfo.sundays.map((dateString) => {
    const date = parse(dateString, dateFormat, currentDate);
    const weekEvents = getWeekEvents(date, eventsByDay);

    const diffDates = differenceInDays(date, currentDateMidnight);
    let isCurrentWeek = false;
    if (diffDates > -1 && diffDates < 7) { // -1 < x < 7
      isCurrentWeek = true;
    }
    return (
      <Week key={dateString}
        weekEvents={weekEvents}
        isWeekdayEmpty={weekInfo.isWeekdayEmpty}
        isCurrentWeek={isCurrentWeek}
        filteredOrgs={filteredOrgs} />
    );
  }
  );


  function handleClick(option: "today" | "prev" | "next") {
    switch (option) {
      case "prev":
        setSelectedDate(subDays(selectedDate, 31));
        break;
      case "next":
        setSelectedDate(addDays(selectedDate, 31));
        break;
      case "today":
        if (isSameDay(currentDate, selectedDate)) {
          window.location.href = "#today";
        } else {
          setSelectedDate(new Date());
        }
        break;
      default:
        break;
    }
  }



  function ControlButton({ option, children }: { option: "today" | "prev" | "next"; children: string }): React.JSX.Element {
    return (
      <ButtonControlStyle onClick={() => handleClick(option)}>
        {children}
      </ButtonControlStyle>
    );
  }

  function WeekdaysRow({ isWeekdayEmpty }: { isWeekdayEmpty: number[] }): React.JSX.Element {
    const weekdays = {
      short: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
      full: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    };
    const sundayZero = new Map([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]])

    const classStyleString = {
      empty: "flex overflow-clip w-11 h-auto min-h-[2rem]",
      notEmpty: "basis-2/12 flex grow flex-col justify-start overflow-clip"
    };

    return (
      <div className='flex justify-center mx-1'>
        {[0, 1, 2, 3, 4, 5, 6].map((index) => {
          const weekdayIndex: number = sundayZero.get(index) as number;
          const isEmpty = (isWeekdayEmpty[weekdayIndex] <= 0);
          let weekday;
          if (isEmpty) {
            weekday = weekdays.short[index];
          } else {
            weekday = weekdays.full[index];
          }
          return (
            <div key={weekdayIndex} className={isEmpty ? classStyleString.empty : classStyleString.notEmpty}>
              <div className='self-center m-auto text-sm md:text-base font-medium text-violet-950 dark:text-purple-400'>
                {weekday}
              </div>
            </div>
          )
        }
        )}
      </div>
    )
  }


  return (
    <div className='MonthView w-full'>
      <div className='Controls flex m-1 pt-1'>
        <ControlButton option='prev'>
          ❮
        </ControlButton>
        <ControlButton option='today'>
          Сегодня
        </ControlButton>
        <ControlButton option='next'>
          ❯
        </ControlButton>
        <h2 className='text-center text-base font-medium text-violet-950 dark:text-purple-400 uppercase 
                      h-6 m-2 w-32'>
          {format(selectedDate, `LLLL YYY`)}
        </h2>
      </div>
      <div className='sticky top-0 z-30 backdrop-blur-sm bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 mb-2'>
        <WeekdaysRow key={"weekdays"} isWeekdayEmpty={weekInfo.isWeekdayEmpty} />
      </div>
      <div className='mx-1'>
        {weeksJSX}
      </div>
    </div >
  );
}
