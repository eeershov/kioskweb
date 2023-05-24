import React, { useState } from "react";

import ModalStyle from "../Elements/ModalStyle";
import kioskLogo from "./kiosk_logo1.png";
import photo from "../../../public/bogdan-was-here.jpg";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  function About() {
    const aboutBody = (
      <div>
        <div className="p-2 max-w-prose m-auto">
          <p className="text-base text-gray-500 leading-relaxed">
            <span>Здесь собраны события в жанре стендап таких уважаемых организаций как горький микрофон, </span>
            <span className="text-violet-800 inline-block">киоск комедии,</span>
            <span> стендап нн и стендап 52.</span>
            <span>Пожалуйста, ходите на стендап в Нижнем Новгороде, и в особенности мероприятия киоска комедии.</span>
          </p>
          <address className="text-right text-base text-gray-500">
            Обратная связь: <a href="mailto:kioskcomedy+web@gmail.com">kioskcomedy+web@gmail.com</a><br />
            Нижний Новгород
          </address>
        </div>
        <div className='h-full min-h-[12rem] w-full flex justify-center backdrop-blur overflow-hidden'>
          <img src={photo} alt="Poster" className="transition-transform object-cover w-full hover:scale-125 sm:w-full" />
        </div>
      </div >
    );
    return (<>
      {showAboutModal ? <ModalStyle setParentState={setShowAboutModal} header="Что?" body={aboutBody} /> : null}
    </>
    );
  }

  function MenuItems() {
    return (<>
      <ul className="font-medium flex flex-col p-4 sm:p-0 border border-gray-100 rounded-lg bg-gray-50 sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0 sm:bg-white">
        <li>
          <span className="block py-2 pl-3 pr-4 text-white bg-purple-600 rounded sm:bg-transparent sm:text-purple-600 sm:p-0" aria-current="page">
            Календарь</span>
        </li>
        <li>
          <span onClick={() => setShowAboutModal(true)}
            className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-purple-600 sm:p-0">
            Что?</span>
        </li>
      </ul>
    </>
    );
  }

  function MobileMenu() {
    return (<>
      {showMobileMenu ?
        <div className="absolute w-full z-50 shadow-xl">
          <MenuItems />
        </div> :
        null
      }
    </>);
  }

  function handleClick() {
    setShowMobileMenu(prev => !prev);
  }

  return (
    <div>

      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="flex items-center">
            <img src={kioskLogo} className="h-8 mr-3" alt="Kiosk Logo" />
            <span className="self-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold whitespace-nowrap">Киоск Комедии</span>
          </span>
          <button type="button" onClick={handleClick} className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Открыть главное меню.</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full sm:block sm:w-auto" id="navbar-default">
            <MenuItems />
          </div>
        </div>
        <MobileMenu />
      </nav>

      <About />
    </div>

  )
}

export default Header;