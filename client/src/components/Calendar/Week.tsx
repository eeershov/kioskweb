import { format, parse } from "date-fns";

import { Day } from "./index";

interface WeekEvents {
  weekEvents: Map<string, []>;
  option: "month-view" | "week-view"
}

export default function Week({ weekEvents, option }: WeekEvents) {
  console.log("Week");
  const dayIterator = weekEvents.entries()
  let days: JSX.Element[] = [];

  function getWeekDays(option: "month-view" | "week-view"): JSX.Element[] {
    const days = [];
    for (const [dateString, events] of dayIterator) {
      const date = format(parse(dateString, `d-M-yyyy`, new Date()), 'EEEE, MMMM d');
      days.push(
        <div key={dateString} className='pb-2'>
          {(option === "week-view") ? <h3 className='text-center self-center uppercase font-bold text-sm p-2'>
            {date}
          </h3> : null}
          {<Day events={events} />}
        </div>
      )
    }
    return days;
  }

  if (option === "month-view") {
    days = getWeekDays("month-view");
  } else {
    days = getWeekDays("week-view");
  }

  return (
    <div>
      {days}
    </div>
  )
}