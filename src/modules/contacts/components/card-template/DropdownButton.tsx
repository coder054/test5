import clsx from 'clsx'
import React, { ReactElement } from 'react'

interface DropdownButton {
  label: string
  labelClass: string
  icon: ReactElement
}

export default function DropdownButton({ label, labelClass, icon, ...rest }) {
  return (
    <button
      {...rest}
      type="button"
      className="flex items-center px-5 py-2 space-x-3 w-full hover:bg-gray-600 duration-150"
    >
      {icon}
      <p className={clsx('text-[16x] font-medium', labelClass)}>{label}</p>
    </button>
  )
}
