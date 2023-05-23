import React, { useEffect } from "react";

export default function ModalStyle({ setParentState, header, body }: { setParentState: (b: false) => void, header: string, body: JSX.Element }) {
  useEffect(() => {
    function handleEsc(event: any) {
      if (event.key === "Escape") {
        setParentState(false);
      }
    }

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  });


  return (
    <>
      {
        <div id="defaultModal" tabIndex={-1} aria-hidden="true"
          className="flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full h-full max-height: -webkit-fill-available overflow-x-hidden overflow-y-auto">
          <div onClick={() => setParentState(false)} className='fixed bg-opacity-30 bg-black backdrop-blur h-full w-full'></div>
          <div className="relative max-w-3xl w-full h-fit m-[1.5rem]">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white flex flex-col justify-between rounded-lg shadow w-full h-full overflow-hidden">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between py-4 px-2 border-b rounded-t">
                <h2 className='text-xl font-mono self-baseline font-bold m-1'>{header}</h2>
                <button type="button" onClick={() => setParentState(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="defaultModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {body}

            </div>
          </div >
        </div >
      }

    </>
  )
}