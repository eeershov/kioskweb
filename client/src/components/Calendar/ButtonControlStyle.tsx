import React, { MouseEventHandler } from "react"

export default function ButtonControlStyle({ onClick, children, disabled }: { onClick: MouseEventHandler, children: string | number, disabled?: boolean }) {
  return (
    <button className="items-center px-4 py-2 text-sm font-medium text-violet-950 bg-transparent mx-1
    border border-violet-950 rounded-lg hover:bg-violet-950 hover:text-white 
    focus:z-10 focus:ring-2 focus:ring-violet-500 focus:bg-violet-950 focus:text-white
    disabled:border-violet-200 disabled:text-violet-200 disabled:hover:bg-transparent"
      onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}