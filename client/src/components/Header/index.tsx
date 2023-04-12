import React, { useState } from "react";

function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  function handleToggle() {
    setNavbarOpen(prev => !prev)
  }

  return (
    <div>
      <div className='h-16 flex 
                      justify-center text-center
                      bg-slate-800
      '>
        <h1 className='self-center text-3xl text-pink-500'>Kiosk Comedy</h1>
      </div>
      <nav className="Menu
                      relative
                      z-10
      ">
        <button onClick={handleToggle}
          className="
                    fixed left-5 top-2 cursor-pointer z-20
                    bg-orange-300
                    rounded-full
                    w-12 h-12
                    flex
                    justify-center
                    items-center
                    md:transition duration-200
                    hover:bg-orange-400
        ">
          {navbarOpen ? "Close" : "Open"}
        </button>
        <ul className={`menuNav 
                        md:transition-all duration-200
                        ${navbarOpen ? "w-full" : "w-0"}
                        fixed
                        bg-slate-100
                        overflow-y-scroll 
                        overflow-hidden
                        h-full 
                        top-0 left-0 bottom-0
                        list-none
                        max-w-[80%]
                        text-black
        `}>
          <li className="first:mt-16">pepepe</li>

        </ul>
      </nav>
    </div>
  )
}

export default Header;