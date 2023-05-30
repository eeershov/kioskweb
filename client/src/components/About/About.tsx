import React from "react";
import photo from "./bogdan-was-here.jpg";
import { TimepadButton, TelegramButton, VkButton } from "../Elements/Socials";

export function About(): JSX.Element {
  return (
    <div>
      <div className="p-2 max-w-prose m-auto">
        <p className="text-base text-gray-500 dark:text-gray-200 leading-relaxed">
          <span>Здесь собраны события в жанре стендап таких уважаемых организаций комиков как горький микрофон, </span>
          <span className="italic text-gray-500 dark:text-gray-200 inline-block">киоск комедии</span>
          <span>, стендап нн и стендап 52. </span>
          <span>Пожалуйста, приходи на стендап в Нижнем Новгороде (особенно советуем мероприятия </span>
          <span className="italic text-gray-500 dark:text-gray-200 inline-block">киоска комедии.</span>)
        </p>

        {/* <---Socials---> */}
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-4 justify-center">
          <TimepadButton size="full" />
          <TelegramButton size="full" />
          <VkButton size="full" />
        </div>

        <address className="text-right text-base text-gray-500 dark:text-gray-200 mt-2 sm:mt-4">
          Обратная связь: <a href="mailto:kioskcomedy@gmail.com">kioskcomedy@gmail.com</a><br />
          Нижний Новгород
        </address>
      </div>

      <div className='h-full min-h-[12rem] w-full flex justify-center backdrop-blur overflow-hidden'>
        <img src={photo} alt="Poster" className="transition-transform object-cover w-full hover:scale-125 sm:w-full" />
      </div>
    </div >
  );
}