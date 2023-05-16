import React, { useContext, useState } from 'react';
import { format } from "date-fns";

import { ViewportContext } from "../../appContext/ViewportContext";
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
    hover:bg-gradient-to-t from-purple-600 to-violet-600 first:rounded-t-lg last:rounded-b-lg" onClick={() => setShowModal(true)}>
      <div className='rounded-md bg-no-repeat bg-cover bg-center bg-local w-[50%] aspect-square mr-1 shrink-0 self-center'
        style={{ backgroundImage: `url(${eventImage})` }}></div>
      <div className="flex flex-col overflow-clip text-violet-950 group-hover:text-white">
        <p className="font-mono font-bold text-sm md:text-lg md:leading-4 overflow-clip text-left my-1">{starts_at}</p>
        <p className="text-sm xl:text-base md:leading-4 xl:leading-5 line-clamp-2 lg:line-clamp-3 w-auto leading-3 break-words">{event.tp_name}</p>
      </div>
    </div>
  );


  const modal1 = ((<>
    <div className="fixed m-auto z-50 w-full overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className='relative w-full max-w-2xl max-h-full'>
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setShowModal(false)}
        ></div>
        <div className="flex items-center px-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className='Organization-block
                          h-24 bg-slate-400 rounded-md p-3 grid grid-rows-1 grid-cols-2'>
              <div className="col-span-1 flex items-center h-full aspect-square bg-purple-600 rounded-full">
                <img className="Logo
                h-auto aspect-square rounded-full object-cover"
                  alt="logo" src={event.tp_org_logo_image_default_url} />
              </div>
              <div className='flex items-center justify-center'>
                <p>{event.tp_org_name}</p>
              </div>
            </div>
            <div className="mt-2 text-left">
              <h4 className="text-lg font-medium text-gray-800">
                {event.tp_name}
              </h4>
              <img className='h-auto w-32 aspect-square rounded-md object-cover'
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
    </div>
  </>)
  )

  const modal2 = (
    <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 max-h-full">
      <div onClick={() => setShowModal(false)} className='fixed bg-opacity-30 bg-black backdrop-blur h-full w-full'></div>
      <div className="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {event.tp_name}
            </h3>
            <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="defaultModal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-2 space-y-6 flex">
            <div className='min-w-[50%] flex '>
              <img src={eventImage} alt="Poster" className="w-auto h-auto max-w-full max-h-full rounded-xl " />
            </div>
            <div className='max-w-[50%] flex flex-wrap'>
              <h2 className='text-xl font-mono self-baseline'>{starts_at}</h2>
              <h2 className='text-xl self-baseline'>{starts_at_weekDay}</h2>
              <div className="flex">
                <img src={event.tp_org_logo_image_default_url} alt="logo" className="rounded-full w-24 h-24 object-cover aspect-square" />
                <p>{event.tp_org_name}</p>
              </div>
              <p className="text-base leading-relaxed text-gray-500  p-2">
                {event.tp_description_short}
              </p>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
            <button type="button" onClick={() => {
              setShowModal(false);
              window.open(`${event.tp_url}`);
            }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
              Открыть на таймпаде ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  function Modal() {
    return (
      <>
        {showModal ? modal2 : null}
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