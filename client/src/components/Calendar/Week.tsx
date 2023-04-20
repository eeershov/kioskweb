import { format, parse } from "date-fns";

import { Day } from "./index";

interface WeekEvents {
  weekEvents: Map<string, []>
}

export default function Week({ weekEvents }: WeekEvents) {
  console.log("Week");
  console.log(weekEvents);

  const dayIterator = weekEvents.entries()
  const days = [];
  for (const [dateString, events] of dayIterator) {
    const date = format(parse(dateString, `d-M-yyyy`, new Date()), 'EEEE, MMMM d');
    days.push(
      <div key={dateString} className='pb-2'>
        <h3 className='text-center self-center uppercase font-bold text-sm p-2'>
          {date}
        </h3>
        {<Day events={events} />}
      </div>
    )
  }

  return (
    <div>
      {days}
    </div>
  )
}