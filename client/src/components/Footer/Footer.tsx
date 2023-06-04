import React from 'react';
import { TimepadButton, TelegramButton, VkButton } from "../Elements/Socials";

function Footer() {

  return (
    <footer className='mx-auto w-full p-4 py-3'>
      <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />
      <div className="flex items-center flex-wrap justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-1">2023 <a href="https://kioskcomedy.org/" className="hover:underline">kioskcomedy.org</a>
        </span>

        {/* <---- Socials ----> */}
        <div className='flex space-x-6 sm:justify-center sm:mt-0 ml-2'>

          <TelegramButton size="tiny" />
          <VkButton size="tiny" />
          <TimepadButton size="tiny" />

        </div>

      </div>
    </footer>
  )
}

export default Footer;