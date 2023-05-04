import {format, parse, isMonday, addDays, previousMonday} from "date-fns";

const dateFormat = `d-M-yyyy`;

export function getWeekEvents(date: Date, map: Map<string, any>): Map<string, any> {
  // check to which week date belongs and return this week with events
  const dateString = format(date, dateFormat);
  const dateType = parse(dateString, dateFormat, new Date())
  const weekDates = new Map();

  let weekStartDay;
  if (isMonday(dateType)) {
    weekStartDay = dateType;
  } else {
    weekStartDay = previousMonday(dateType);
  }

  for (let i = 0; i < 7; i++) {
    const dateToRecieve = addDays(weekStartDay, i);
    const dateString = format(dateToRecieve, dateFormat);
    const events = map.get(dateString);
    weekDates.set(dateString, events);
  }
  return weekDates;
}