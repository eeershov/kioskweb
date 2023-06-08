import React from "react";


export default function OrgsFilter({ handleOnlyKioskClick, isPressed }: { handleOnlyKioskClick: () => void, isPressed: boolean }) {

  return (
    <div onClick={handleOnlyKioskClick} className="overflow-hidden sm:absolute sm:m-2 sm:pt-3 sm:pr-4 self-end p-2 flex selection:bg-transparent">
      <div aria-checked={isPressed} className="bg-white dark:bg-purple-600/30 w-5 h-5 ring-1 cursor-default ring-purple-600 rounded flex items-center justify-center shadow-md data-[state-'checked']:bg-black">
        {isPressed ?
          <span className="text-purple-600">✓</span> :
          null}
      </div>
      <label className="text-violet-950 dark:text-purple-400 pl-2 leading-none">
        только киоск
      </label>
    </div >
  );
}