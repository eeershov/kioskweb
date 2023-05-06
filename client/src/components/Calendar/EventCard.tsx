import React, { useContext, useState } from 'react';

import { ViewportContext } from "../../appContext/ViewportContext";
import type { EventWithOrganizationData } from "../../types/EventWithOrg.type";

interface Event {
  event: EventWithOrganizationData;
}

export default function EventCard({ event }: Event) {
  const [showModal, setShowModal] = useState(false);
  const mobOrDesk = useContext(ViewportContext);

  const starts_at = new Date(event.tp_starts_at).toLocaleTimeString('ru-RU', { 'timeStyle': 'short' });
  let eventImage: string = event.tp_poster_image_default_url || event.tp_org_logo_image_default_url;

  const mobile = (
    <div className="Card
                    rounded-2xl justify-center bg-no-repeat bg-cover bg-center bg-local
                    w-full h-28 overflow-hidden shadow-2xl my-2"
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
              onClick={() => setShowModal(true)}
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
    hover:bg-gradient-to-t from-purple-600 to-violet-600 last:rounded-b-lg" onClick={() => setShowModal(true)}>
      <div className='rounded-md bg-no-repeat bg-cover bg-center bg-local w-[50%] aspect-square mr-1 shrink-0 self-center'
        style={{ backgroundImage: `url(${eventImage})` }}></div>
      <div className="flex flex-col overflow-clip text-violet-950 group-hover:text-white">
        <p className="font-bold text-sm md:text-base md:leading-4 xl:text-lg overflow-clip lg:mb-1">{starts_at}</p>
        <p className="text-sm xl:text-base md:leading-4 xl:leading-5 line-clamp-2 lg:line-clamp-3 w-auto leading-3 break-words">{event.tp_name}</p>
      </div>
    </div>
  );

  function Modal() {
    return (
      <>
        {showModal ? (<>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className='Organization-block
                                h-24 bg-slate-400 rounded-md p-3 grid grid-rows-1 grid-cols-2'>
                  <div className="col-span-1 flex items-center justify-center flex-none h-full aspect-square bg-purple-600 rounded-full bg-cover"
                    style={{ backgroundImage: `url(${event.tp_org_logo_image_default_url})` }}></div>
                  <div className='flex items-center justify-center'>
                    <p>{event.tp_org_name}</p>
                  </div>
                </div>
                <div className="mt-2 text-left">
                  <h4 className="text-lg font-medium text-gray-800">
                    {event.tp_name}
                  </h4>
                  <img className='h-auto w-full aspect-square rounded-md object-cover'
                    alt="Event poster" src={eventImage} />
                  <p className="mt-2 text-[15px] leading-relaxed text-gray-500 overflow-y-scroll max-h-20">
                    {event.tp_description_short}
                  </p>
                  <div className="buttons-block items-center gap-2 mt-3 sm:flex">
                    <button
                      className="w-full mt-2 p-2.5 flex-1 bg-purple-600 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => {
                        setShowModal(false);
                        window.open(`${event.tp_url}`);
                      }}

                    >
                      Открыть на таймпаде ↗
                    </button>
                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => setShowModal(false)}
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>) : null}
      </>
    )
  }

  return (
    <>
      {mobOrDesk === "Mobile" ? mobile : desktop}
      <Modal />
    </>
  )
}