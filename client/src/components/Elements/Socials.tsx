import React from "react";

import tg_logo from "./Telegram-logo.svg";
import vk_logo from "./VKcom-logo.svg";
import tp_logo from "./Timepad_logo_75.png";


type SizeT = "tiny" | "full";

type SocialButtonProps = {
  size: SizeT; text: string; address: string; children: JSX.Element
}


function SocialButton({ size, text, address, children }: SocialButtonProps): JSX.Element {
  if (size === "full") {
    return (
      <button title={address} onClick={() => window.open(address)}
        className={`bg-violet-800 hover:bg-violet-800/90 focus:ring-2 ring-black focus:ring-offset-2 
        flex items-center h-fit rounded-lg overflow-hidden p-1`}>
        <div className="h-6 w-6 rounded-full overflow-hidden">
          {children}
        </div>
        <p className="p-1 text-white text-base">{text}</p>
      </button>
    );
  } else {
    return (
      <button title={address} onClick={() => window.open(address)}
        className={`focus:ring-2 ring-black hover:scale-110 focus:ring-offset-2 flex items-center h-fit rounded-full overflow-hidden`}>
        <div className="h-6 w-6 rounded-full overflow-hidden">
          {children}
        </div>
      </button>
    );
  }
}

export function TelegramButton({ size }: { size: SizeT }) {
  return (
    <SocialButton size={size} text="t.me/kioskcomedy" address="https://t.me/kioskcomedy">
      <img alt="Telegram logo" src={tg_logo}></img>
    </SocialButton>
  );
}

export function TimepadButton({ size }: { size: SizeT }) {
  return (
    <SocialButton size={size} text="билеты" address="https://kioskcomedy.timepad.ru">
      <img alt="Timepad.ru logo" className="scale-110" src={tp_logo}></img>
    </SocialButton>
  );
}

export function VkButton({ size }: { size: SizeT }) {
  return (
    <SocialButton size={size} text="vk.com/kioskcomedy" address="https://vk.com/kioskcomedy">
      <img alt="Vk logo" className="scale-110" src={vk_logo}></img>
    </SocialButton>
  );
}