import React, { useContext } from 'react';
import { format, isSameDay } from "date-fns";

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
  const dateFormatMobile = `EEEE d`;
  const dateFormatDesktop = `d`;
  const isCurrentDay = isSameDay(new Date(), date);

  const dateStringMobile = format(date, dateFormatMobile);
  const dateStringDesktop = format(date, dateFormatDesktop);


  const mobileDate = (
    <h3 className='text-center self-center uppercase font-bold text-sm p-2'>
      {dateStringMobile}
    </h3>
  );

  const cornerDate = (
    <div className='rounded-md bg-purple-900 bg-opacity-30 h-4 md:h-5 lg:h-6 aspect-square min-[600px]:text-center absolute backdrop-blur-sm text-white m-1'>
      <div className='lg:font-bold text-xs md:text-sm lg:text-base opacity-90'>
        {dateStringDesktop}
      </div>
    </div>
  );

  const dayStyles = {
    emptyDay: {
      mobile: "relative",
      desktop: "flex flex-wrap m-1 ring-1 ring-slate-900/5 rounded-lg w-full shadow-sm min-h-[2rem] relative",
      boxMobile: "relative",
      boxDesktop: "flex flex-wrap w-11 min-h-[2rem] grow relative",
    },
    dayContent: {
      mobile: "Day-content flex-row pb-4 mx-2 relative",
      desktop: "Day-content flex flex-col justify-start m-1 ring-1 ring-slate-900/5 rounded-lg shadow-sm relative overflow-clip h-full",
      boxMobile: "flex-row relative",
      boxDesktop: "Day-content basis-2/12 flex flex-col justify-start relative overflow-clip",
    },
    currentDay: {
      mobile: "ring-2 ring-violet-400 ring-offset-0 rounded-lg absolute w-full h-full",
      desktop: "border-4 border-violet-400 rounded-xl absolute w-full h-full",
    }
  }

  let dayClass: string[] = [];
  let ringClass: string[] = [];
  let boxClass: string[] = [];

  if (mobOrDesk === "Mobile") {
    ringClass.push(dayStyles.currentDay.mobile);
  } else {
    ringClass.push(dayStyles.currentDay.desktop);
  }
  const currentDayRing = () => {
    if (isCurrentDay) {
      return (
        <div className={ringClass.join(" ")}></div>
      );
    } else {
      return null;
    }
  }

  if (events.length === 0 && isEmpty) {
    if (mobOrDesk === "Mobile") {
      dayClass.push(dayStyles.emptyDay.mobile);
      boxClass.push(dayStyles.emptyDay.boxMobile);
    } else {
      dayClass.push(dayStyles.emptyDay.desktop)
      boxClass.push(dayStyles.emptyDay.boxDesktop);
    }
    return (<>
      <div className={boxClass.join(" ")}>
        {currentDayRing()}
        <div className={dayClass.join(" ")}>
          {mobOrDesk === "Desktop" ? cornerDate : mobileDate}
        </div>
      </div></>
    )
  } else if (events.length === 0) {
    if (mobOrDesk === "Mobile") {
      dayClass.push(dayStyles.dayContent.mobile);
      boxClass.push(dayStyles.dayContent.boxMobile);
    } else {
      dayClass.push(dayStyles.dayContent.desktop);
      boxClass.push(dayStyles.dayContent.boxDesktop);
    }
    return (<>
      <div className={boxClass.join(" ")}>
        {currentDayRing()}
        <div className={dayClass.join(" ")}>
          {mobOrDesk === "Desktop" ? cornerDate : mobileDate}
        </div>
      </div>
    </>
    )
  }

  if (mobOrDesk === "Mobile") {
    dayClass.push(dayStyles.dayContent.mobile);
    boxClass.push(dayStyles.dayContent.boxMobile);
  } else {
    dayClass.push(dayStyles.dayContent.desktop);
    boxClass.push(dayStyles.dayContent.boxDesktop);
  }

  return (
    <>
      <div className={boxClass.join(" ")}>
        {currentDayRing()}
        <div className={dayClass.join(" ")}>
          {mobOrDesk === "Desktop" ? cornerDate : mobileDate}
          <div>
            {events.map((event, i) => {
              return (
                <EventCard key={i} event={event} />
              )
            })}</div>
        </div>
      </div>
    </>
  );
}