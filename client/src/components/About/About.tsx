import React from "react";
import photo from "./bogdan-was-here.jpg";
import tg_logo from "./Telegram-logo.svg";
import vk_logo from "./VKcom-logo.svg";
import tp_logo from "./Timepad_logo_75.png";

function SocialButton({ text, address, children }: { text: string, address: string, children: JSX.Element }): JSX.Element {
  return (
    <button onClick={() => window.open(address)}
      className={`bg-violet-800 hover:bg-violet-800/90 focus:ring-2 ring-black focus:ring-offset-2  flex items-center h-fit rounded-lg overflow-hidden p-1`}>
      <div className="h-6 w-6 rounded-full overflow-hidden">
        {children}
      </div>
      <p className="p-1 text-white text-base">{text}</p>
    </button>
  );
}

export function About(): JSX.Element {
  return (
    <div>
      <div className="p-2 max-w-prose m-auto">
        <p className="text-base text-gray-500 leading-relaxed">
          <span>Здесь собраны события в жанре стендап таких уважаемых организаций комиков как горький микрофон, </span>
          <span className="italic text-gray-500 inline-block">киоск комедии</span>
          <span>, стендап нн и стендап 52. </span>
          <span>Пожалуйста, приходи на стендап в Нижнем Новгороде (особенно советуем мероприятия </span>
          <span className="italic text-gray-500 inline-block">киоска комедии.</span>)
        </p>

        {/* <---Socials---> */}
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-4 justify-center">
          <SocialButton text="билеты" address="https://kioskcomedy.timepad.ru">
            <img alt="Timepad.ru logo" className="scale-110" src={tp_logo}></img>
          </SocialButton>
          <SocialButton text="t.me/kioskcomedy" address="https://t.me/kioskcomedy">
            <img alt="Telegram logo" src={tg_logo}></img>
          </SocialButton>
          <SocialButton text="vk.com/kioskcomedy" address="https://vk.com/kioskcomedy">
            <img alt="Vk logo" className="scale-110" src={vk_logo}></img>
          </SocialButton>
        </div>

        <address className="text-right text-base text-gray-500 mt-2 sm:mt-4">
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