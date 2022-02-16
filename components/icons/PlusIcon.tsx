import React, { ComponentPropsWithRef } from 'react'
export function PlusIcon({ className, ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M19.5 13H13.5V19H11.5V13H5.5V11H11.5V5H13.5V11H19.5V13Z"
        fill="#6B7280"
      />
    </svg>
  )
}
