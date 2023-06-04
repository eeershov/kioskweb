import React, { useState } from "react";

import ModalStyle from "../Elements/ModalStyle";
import kiosk from "./kiosk.svg";
import { About } from "../About/About"
import DarkModeSwitch from "../DarkModeSwitch/Switcher"

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [siteName, setSiteName] = useState({ name: "Киоск комедии", rnd: 0 });


  function AboutModal() {
    return (<>
      {showAboutModal ? <ModalStyle setParentState={setShowAboutModal} header="Что?" body={<About />} /> : null}
    </>
    );
  }

  function MenuItems() {
    return (<>
      <ul className="font-medium bg-white dark:bg-gray-900 flex flex-col p-4 sm:p-0 border border-gray-100 dark:border-gray-800 rounded-lg  sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0">
        <li>
          <span className="block py-2 pl-3 pr-4 text-gray-900 dark:text-white rounded hover:bg-gray-100/20 sm:hover:bg-transparent sm:border-0 sm:hover:text-purple-600 sm:p-0">
            <DarkModeSwitch />
          </span>
        </li>
        <li>
          <span className="block py-2 pl-3 pr-4 text-white bg-purple-600 rounded sm:bg-transparent sm:text-purple-600 sm:p-0" aria-current="page">
            Календарь</span>
        </li>
        <li>
          <span onClick={() => setShowAboutModal(true)}
            className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 dark:text-white rounded hover:bg-gray-100/20 sm:hover:bg-transparent sm:border-0 sm:hover:text-purple-600 hover:underline sm:p-0">
            Что?</span>
        </li>
      </ul>
    </>
    );
  }

  function MobileMenu() {
    return (<>
      {showMobileMenu ?
        <div className="sm:hidden absolute w-full z-50 rounded-lg shadow-md">
          <MenuItems />
        </div> :
        null
      }
    </>);
  }

  function handleClick() {
    setShowMobileMenu(prev => !prev);
  }


  function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function handleNameClick() {
    const names = ["Киоск комедии", "Кусок комедии", "Коморка комедии", "Стендап алиэкспресс", "Кукла колдуна", "Не оценивайте, расслабьтесь", "Себе потыкай", "В анус ❤️ себе потыкай", "Я логотип", "Ай", "Damage is done", "Кусок комеди", "Кисок комедии", "Бывало такое"];
    const namesLength = names.length;
    let rnd = getRndInteger(0, namesLength);
    while (rnd === siteName.rnd) {
      rnd = getRndInteger(0, namesLength);
    }
    const name = names[rnd];
    setSiteName({ name, rnd });
  }

  return (
    <div className="w-full">
      <nav>
        <div className="max-w-7xl flex items-center justify-between mx-auto p-4">
          <span onClick={handleNameClick} className="flex items-center cursor-default">
            <img src={kiosk} className="rounded-full sm:hover:animate-spin h-8 mr-3" alt="Kiosk Logo" />
            <span className="truncate self-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold whitespace-nowrap">
              {siteName.name}
            </span>
          </span>
          <button type="button" onClick={handleClick} className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Открыть главное меню.</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full sm:block sm:w-auto" id="navbar-default">
            <MenuItems />
          </div>
        </div>
        <MobileMenu />
      </nav>

      <AboutModal />
    </div>

  )
}

export default Header;