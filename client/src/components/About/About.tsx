import React from "react";
import photo from "./bogdan-was-here.jpg";

export function About({ handleCloseAbout }: { handleCloseAbout: () => void }) {
  return (
    <div>
      <div className="p-2 max-w-prose m-auto">
        <p className="text-base text-gray-500 leading-relaxed">
          <span>Здесь собраны события в жанре стендап таких уважаемых организаций как горький микрофон, </span>
          <span className="text-violet-800 inline-block">киоск комедии</span>
          <span>, стендап нн и стендап 52. </span>
          <span>Пожалуйста, ходите на стендап в Нижнем Новгороде, и в особенности мероприятия </span>
          <span className="text-violet-800 inline-block">киоска комедии.</span>
        </p>
        <address className="text-right text-base text-gray-500">
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