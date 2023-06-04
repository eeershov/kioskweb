import React, { useState } from "react";
import useDarkSide from "./useDarkside";
import * as Switch from "@radix-ui/react-switch";


export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [isDark, setIsDark] = useState(colorTheme === "light" ? true : false);
  const moons = ["🌚", "🌝"];

  function toggleDarkMode(checked: boolean) {
    setTheme(colorTheme);
    setIsDark(checked);
  };

  return (
    <form>
      <div className="flex">
        <label className="Label mr-1" htmlFor="airplane-mode">
          {moons[+isDark]}
        </label>
        <Switch.Root onCheckedChange={toggleDarkMode} checked={isDark} className="SwitchRoot w-11 h-6 bg-slate-300 data-[state='checked']:bg-slate-700 rounded-full relative shadow-sm" id="airplane-mode">
          <Switch.Thumb className="SwitchThumb block w-5 h-5 bg-white rounded-full shadow-md 
          transform transition-transform translate-x-0.5 will-change-transform
          data-[state='checked']:translate-x-[1.375rem]" />
        </Switch.Root>
      </div>
    </form>
  );
}