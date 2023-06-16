import React, { useEffect } from "react";

interface ModalStyleProps {
  setParentState: (b: false) => void,
  header: string,
  children: JSX.Element | JSX.Element[]
}

export default function ModalStyle({ setParentState, header, children }: ModalStyleProps) {
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
          className="flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full h-full max-height: -webkit-fill-available">

          <div onClick={() => setParentState(false)} className='fixed bg-opacity-30 bg-black backdrop-blur h-full w-full'></div>

          <div className="relative max-w-3xl w-full max-h-screen m-[1.5rem] rounded-lg overflow-hidden">

            {/* <!-- Modal content --> */}
            <div className="relative bg-white dark:bg-gray-900 flex flex-col justify-between shadow w-full max-h-[calc(100vh-2.5rem)] overflow-hidden">

              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between py-2 px-2 border-b border-gray-200 dark:border-gray-700">
                <div className="text-xl font-mono self-baseline font-bold mt-1 w-full truncate">
                  <h2 className="text-center text-violet-950 dark:text-purple-500">{header}</h2>
                </div>
                <button type="button" onClick={() => setParentState(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 dark:hover:bg-purple-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="defaultModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {children}

            </div>
          </div >
        </div >
      }

    </>
  )
}
