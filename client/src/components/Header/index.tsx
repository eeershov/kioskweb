import React from "react";
import kioskLogo from "./kiosk_logo1.png";

function Header() {
  // <div>
  //   <div className='h-14 flex justify-center items-baseline 
  //   bg-violet-900/5'>
  //     <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-3xl font-bold'>Kiosk Comedy</h1>
  //     <span className="">About</span>
  //   </div>
  // </div>

  return (

    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <img src={kioskLogo} className="h-8 mr-3" alt="Kiosk Logo" />
          <span className="self-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold whitespace-nowrap">Киоск Комедии</span>
        </a>
        <button type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Открыть главное меню.</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        <div className="hidden w-full sm:block sm:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0 sm:bg-white dark:bg-gray-800 sm:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded sm:bg-transparent sm:text-blue-700 sm:p-0 dark:text-white sm:dark:text-blue-500" aria-current="page">Календарь</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 dark:text-white sm:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white sm:dark:hover:bg-transparent">Что</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Header;