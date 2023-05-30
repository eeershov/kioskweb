import React from 'react';
import { TimepadButton, TelegramButton, VkButton } from "../Elements/Socials";

function Footer() {

  return (
    <footer className='mx-auto w-full p-4 py-6 lg:py-8'>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">2023 <a href="https://kioskcomedy.org/" className="hover:underline">kioskcomedy.org</a>
        </span>

        {/* <---- Socials ----> */}
        <div className='flex mt-4 space-x-6 sm:justify-center sm:mt-0'>

          <TelegramButton size="tiny" />
          <VkButton size="tiny" />
          <TimepadButton size="tiny" />

        </div>

      </div>
    </footer>
  )
}

export default Footer;