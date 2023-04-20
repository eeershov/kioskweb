import { format, parse } from "date-fns";

import { Day } from "./index";

interface WeekEvents {
  weekEvents: Map<string, []>
}

export default function Week({ weekEvents }: WeekEvents) {
  console.log("Week");
  console.log(weekEvents);

  const dayIterator = weekEvents.entries()
  const divs = [];
  for (const [date, events] of dayIterator) {
    divs.push(
      <div key={1} className='pb-2'>
        <h3 className='text-center self-center uppercase font-bold text-sm p-2'>
          {format(parse(date, `d-M-yyyy`, new Date()), 'EEEE, MMMM d')}
        </h3>
        {<Day events={events} />}
      </div>
    )
  }

  return (
    <div>
      {divs}
    </div>
  )
}