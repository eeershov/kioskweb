import React, { MouseEventHandler } from "react"

export default function ButtonControlStyle({ onClick, children, disabled }: { onClick: MouseEventHandler, children: string | number, disabled?: boolean }) {
  return (
    <button className="items-center px-4 py-2 text-sm font-medium focus:z-10 focus:ring-2 border bg-transparent mx-1 rounded-lg
    text-violet-950 
    dark:text-purple-500 
    border-violet-950 hover:bg-violet-950 hover:text-white 
    dark:border-purple-500 dark:hover:bg-purple-500 dark:hover:text-gray-900
    focus:ring-violet-500 focus:bg-violet-950 focus:text-white
    dark:focus:bg-purple-500 dark:focus:text-gray-900
    disabled:border-violet-200 disabled:text-violet-200 disabled:hover:bg-transparent"
      onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}