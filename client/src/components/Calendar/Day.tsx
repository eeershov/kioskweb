import React, { useContext } from 'react';
import { format } from "date-fns";

import { ViewportContext } from '../../appContext/ViewportContext';
import { EventCard } from "./index";
import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";


interface Events {
  events: EventWithOrganizationData[] | [];
  date: Date;
  isEmpty: boolean;
}

export default function Day({ events, date, isEmpty }: Events) {
  const mobOrDesk = useContext(ViewportContext);
  const dateFormat = `d`;

  const dateString = format(date, dateFormat)


  const cornerDate = (
    <div className='relative'>
      <div className='rounded-md bg-purple-900 bg-opacity-30 h-4 md:h-5 lg:h-6 aspect-square min-[600px]:text-center absolute backdrop-blur-sm text-white m-1'>
        <div className='lg:font-bold text-xs md:text-sm lg:text-base opacity-90'>
          {dateString}
        </div>
      </div>
    </div>
  );


  const emptyDay = {
    mobile: "",
    desktop: "shrink flex flex-wrap m-1 overflow-clip ring-1 ring-slate-900/5 rounded-lg w-9 shadow-sm h-auto min-h-[2rem]"
  };

  const dayContent = {
    mobile: "Day-content flex-row pb-4",
    desktop: "Day-content basis-2/12 flex flex-col justify-start bg-white m-1 overflow-clip ring-1 ring-slate-900/5 rounded-lg shadow-sm"
  };


  if (events.length === 0 && isEmpty) {
    return (
      <div className={mobOrDesk === "Mobile" ? emptyDay.mobile : emptyDay.desktop}>
        {mobOrDesk === "Desktop" && cornerDate}
      </div>
    )
  } else if (events.length === 0) {
    return (
      <div className={mobOrDesk === "Mobile" ? dayContent.mobile : dayContent.desktop}>
        {mobOrDesk === "Desktop" && cornerDate}
      </div>
    )
  }

  return (
    <div className={mobOrDesk === "Mobile" ? dayContent.mobile : dayContent.desktop}>
      {mobOrDesk === "Desktop" && cornerDate}
      {events.map((event, i) => {
        return (
          <EventCard key={i} performance={event} />
        )
      })}
    </div>
  );
}