import React from "react";

interface PropsForModal {
  tp_name: string,
  tp_org_logo_image_default_url: string,
  tp_org_name: string,
  tp_description_short: string,
  eventImage: string,
  tp_url: string,
  closeModal: () => void,
}

export default function BodyForModal({ tp_name, tp_org_logo_image_default_url, tp_org_name, tp_description_short, eventImage, tp_url, closeModal }: PropsForModal) {
  return (
    <>
      {/* Modal body */}
      <div className="overflow-clip m-2 flex flex-col sm:flex-row relative h-fit sm:h-fit">

        {/* Desktop-Left-Mobile-Up */}
        <div className='pb-3 max-h-[50%] sm:h-auto sm:w-[50%] overflow-y-auto w-full flex-col sm:mr-[0.12rem] mb-[0.12rem] sm:mb-0'>
          {/* Event name */}
          <div className='flex'>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
              {tp_name}
            </h3>
          </div>
          {/* Description and Org */}
          <div className=''>
            <div className='float-right sm:mr-2 p-1 m-1 rounded ring-slate-900/5 dark:ring-purple-500/10 w-[30%] ring-2 '>
              <div className="flex flex-col justify-center items-center">
                <img src={tp_org_logo_image_default_url} alt="logo"
                  className="rounded-full w-auto h-auto object-cover aspect-square" />
                <h4 className='text-base font-mono font-bold text-center leading-4 text-gray-500 dark:text-gray-200 break-all sm:break-normal'>
                  {tp_org_name}
                </h4>
              </div>
            </div>
            <p className="text-base text-gray-500 dark:text-gray-200 pb-2">
              {tp_description_short}
            </p>
          </div>
        </div>

        {/* Desktop-Right-Mobile-Down */}
        <div className={`min-h-[50%] flex-grow sm:h-auto sm:w-[50%] flex justify-center blur-0 overflow-clip sm:ml-[0.12rem] mt-[0.12rem] sm:mt-0`}>
          <div className={`w-full h-full flex sm:aspect-square justify-center blur-0 rounded-2xl overflow-hidden`}>
            <div className='w-full h-full bg-cover' style={{ backgroundImage: `url(${eventImage})` }}>
              <div className='h-full w-full flex justify-center backdrop-blur'>
                <img src={eventImage} alt="Poster" className="transition-transform  sm:object-scale-down w-full sm:hover:scale-125" />
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <!-- Modal footer --> */}
      <div className="flex justify-end p-2 border-t border-gray-200 dark:border-gray-700">
        <button type="button" onClick={() => {
          closeModal();
          window.open(`${tp_url}`);
        }} className="text-white bg-violet-800 hover:bg-violet-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full sm:w-fit rounded-lg text-sm px-5 py-2.5 text-center">
          Зарегистрироваться
        </button>
      </div>
    </>
  )
}
