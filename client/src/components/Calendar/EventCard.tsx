import React, { useContext, useState, useEffect } from 'react';
import { format } from "date-fns";

import { ViewportContext } from "../../appContext/ViewportContext";
import ModalStyle from "../Elements/ModalStyle";
import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

interface Event {
  event: EventWithOrganizationData;
}

export default function EventCard({ event }: Event) {
  const [showModal, setShowModal] = useState(false);
  const mobOrDesk = useContext(ViewportContext);

  const dateFormatMobile = `EEEE d MMM`;
  const date = new Date(event.tp_starts_at);

  const starts_at = date.toLocaleTimeString('ru-RU', { 'timeStyle': 'short' });
  const starts_at_weekDay = format(date, dateFormatMobile);
  const eventImage: string = event.tp_poster_image_default_url || event.tp_org_logo_image_default_url;

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [showModal])


  const mobile = (
    <div className="Card
                    rounded-2xl justify-center bg-no-repeat bg-cover bg-center bg-local
                    w-full h-28 overflow-hidden shadow-md my-2 cursor-pointer"
      onClick={() => setShowModal(true)}
      style={{ backgroundImage: `url(${eventImage})` }}>
      <div className="Two-sides 
                      grid grid-cols-3 grid-rows-1 h-full">
        <div className="Left-side
                        flex col-span-1 place-items-end place-content-start p-2 bg-cover bg-center bg-local bg-no-repeat"
          style={{ backgroundImage: `url(${eventImage})` }}>
        </div>
        <div className="Right-side 
                        flex-col justify-center col-span-2 text-black bg-white w-full h-full bg-opacity-70 backdrop-blur-sm">
          <div className="Right-top-side
                          bg-white bg-opacity-30 flex items-center justify-between p-2 h-[50%]">
            <p className="overflow-hidden leading-5 max-h-10">{event.tp_name}</p>
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
    <div className="Card w-full h-fit flex p-1 group cursor-pointer
    hover:bg-gradient-to-t from-purple-600 to-violet-600 first:rounded-t-lg last:rounded-b-lg" onClick={() => setShowModal(true)}>
      <div className='rounded-md bg-no-repeat bg-cover bg-center bg-local w-[50%] aspect-square mr-1 shrink-0 self-center'
        style={{ backgroundImage: `url(${eventImage})` }}></div>
      <div className="flex flex-col overflow-clip text-violet-950 group-hover:text-white">
        <p className="font-mono font-bold text-sm md:text-lg md:leading-4 overflow-clip text-left my-1">{starts_at}</p>
        <p className="text-sm xl:text-base md:leading-4 xl:leading-5 line-clamp-2 lg:line-clamp-3 w-auto leading-3 break-words">{event.tp_name}</p>
      </div>
    </div>
  );

  const bodyForModal = (
    <>
      {/* Modal body */}
      <div className="overflow-clip m-2 flex flex-col sm:flex-row relative h-fit sm:h-fit">

        {/* Desktop-Left-Mobile-Up */}
        <div className='pb-3 max-h-[50%] sm:h-auto sm:w-[50%] overflow-y-auto w-full flex-col sm:mr-[0.12rem] mb-[0.12rem] sm:mb-0'>
          {/* Event name */}
          <div className='flex'>
            <h3 className="text-xl font-semibold text-gray-900 ">
              {event.tp_name}
            </h3>
          </div>
          {/* Description and Org */}
          <div className=''>
            <div className='float-right sm:mr-2 p-1 m-1 rounded ring-slate-900/5 w-[30%] ring-2 '>
              <div className="flex flex-col justify-center items-center">
                <img src={event.tp_org_logo_image_default_url} alt="logo"
                  className="rounded-full w-auto h-auto object-cover aspect-square" />
                <h4 className='text-base font-mono font-bold text-center leading-4 text-gray-500 break-all sm:break-normal'>{event.tp_org_name}</h4>
              </div>
            </div>
            <p className="text-base text-gray-500 pb-2">
              {event.tp_description_short}
            </p>
          </div>
        </div>

        {/* Desktop-Right-Mobile-Down */}
        <div className={`min-h-[50%] flex-grow sm:h-auto sm:w-[50%] flex justify-center blur-0 overflow-clip sm:ml-[0.12rem] mt-[0.12rem] sm:mt-0`}>
          <div className={`w-full h-full flex sm:aspect-square justify-center blur-0 rounded-2xl overflow-hidden`}>
            <div className='w-full h-full bg-cover' style={{ backgroundImage: `url(${eventImage})` }}>
              <div className='h-full w-full flex justify-center backdrop-blur'>
                <img src={eventImage} alt="Poster" className="object-scale-down w-full hover:object-contain" />
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <!-- Modal footer --> */}
      <div className="flex justify-end p-2 border-t border-gray-200">
        <button type="button" onClick={() => {
          setShowModal(false);
          window.open(`${event.tp_url}`);
        }} className="text-white bg-violet-800 hover:bg-violet-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full sm:w-fit rounded-lg text-sm px-5 py-2.5 text-center">
          Открыть на таймпаде ↗
        </button>
      </div>
    </>
  )
  function Modal() {
    return (
      <div id="">
        <ModalStyle setParentState={setShowModal} header={`${starts_at} ${starts_at_weekDay}`} body={bodyForModal} />
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