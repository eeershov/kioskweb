import React, { useContext, useState } from 'react';
import { format } from "date-fns";

import { decodeHtml } from '../../utils/decodeHtml';
import { ViewportContext } from "../../appContext/ViewportContext";
import ModalStyle from "../Elements/ModalStyle";
import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";
import BodyForModal from './EventCardBodyForModal';

interface Event {
  event: EventWithOrganizationData;
  hideEvent: boolean;
}

export default function EventCard({ event, hideEvent }: Event) {
  const [showModal, setShowModal] = useState(false);
  const mobOrDesk = useContext(ViewportContext);

  const dateFormatMobile = `EEEE d MMM`;
  const date = new Date(event.tp_starts_at);

  const starts_at = date.toLocaleTimeString('ru-RU', { 'timeStyle': 'short' });
  const starts_at_weekDay = format(date, dateFormatMobile);
  const eventImage: string = event.tp_poster_image_default_url || event.tp_org_logo_image_default_url;

  const tp_description_short = decodeHtml(event.tp_description_short);
  const tp_name = decodeHtml(event.tp_name);


  const mobile = (
    <div className={hideEvent ? "hidden" : `Card
                    rounded-2xl justify-center bg-no-repeat bg-cover bg-center bg-local
                    w-full h-28 overflow-hidden shadow-md my-2 cursor-pointer`}
      onClick={() => setShowModal(true)}
      style={{ backgroundImage: `url(${eventImage})` }}>
      <div className="Two-sides
                      grid grid-cols-3 grid-rows-1 h-full">
        <div className="Left-side
                        flex col-span-1 place-items-end place-content-start p-2 bg-cover bg-center bg-local bg-no-repeat"
          style={{ backgroundImage: `url(${eventImage})` }}>
        </div>
        <div className="Right-side 
                        flex-col justify-center col-span-2 text-black dark:text-white bg-white dark:bg-black w-full h-full bg-opacity-70 dark:bg-opacity-70 backdrop-blur-sm">
          <div className="Right-top-side
                          bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-30 flex items-center justify-between p-2 h-[50%]">
            <p className="overflow-hidden leading-5 max-h-10">{tp_name}</p>
            <p className="Time-start
                          font-black text-xl">
              {starts_at}
            </p>
          </div>
          <div className='Right-bottom-side
                          flex justify-between items-center h-[50%] px-2'>
            <img className="Logo
                            max-h-12 aspect-square rounded-full object-cover"
              alt="logo" src={event.tp_org_logo_image_default_url} />
            <button
              type='button'
              className="flex text-white max-h-8 w-min py-1 px-3 rounded-full bg-purple-600 justify-center items-center"
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const desktop = (
    <div className={hideEvent ? "hidden" : `Card w-full h-fit flex p-1 group cursor-pointer 
    hover:bg-gradient-to-t from-purple-600 to-violet-600 first:rounded-t-lg last:rounded-b-lg`}
      onClick={() => setShowModal(true)}>
      <div className='rounded-md bg-no-repeat bg-cover bg-center bg-local w-[50%] aspect-square mr-1 shrink-0 self-center'
        style={{ backgroundImage: `url(${eventImage})` }}></div>
      <div className="flex flex-col overflow-clip text-violet-950 dark:text-purple-200 group-hover:text-white">
        <p className="font-mono font-bold text-sm md:text-lg md:leading-4 overflow-clip text-left my-1">{starts_at}</p>
        <p className="text-sm xl:text-base md:leading-4 xl:leading-5 line-clamp-2 lg:line-clamp-3 w-auto leading-3 break-words pr-2">{tp_name}</p>
      </div>
    </div>
  );

  function Modal() {
    return (
      <div id="">
        <ModalStyle setParentState={setShowModal} header={`${starts_at} ${starts_at_weekDay}`}>
          <BodyForModal tp_name={tp_name} tp_org_logo_image_default_url={event.tp_org_logo_image_default_url} tp_org_name={event.tp_org_name} tp_description_short={tp_description_short} eventImage={eventImage} tp_url={event.tp_url} closeModal={() => setShowModal(false)} />
        </ModalStyle>
      </div>
    )
  }

  return (
    <>
      {mobOrDesk === "Mobile" ? mobile : desktop}
      {showModal ? <Modal /> : null}
    </>
  )
}
