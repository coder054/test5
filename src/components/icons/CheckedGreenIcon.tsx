import React, { ComponentPropsWithRef } from 'react'
export function CheckedGreenIcon({ ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M6.0001 10.7799L3.2201 7.9999L2.27344 8.9399L6.0001 12.6666L14.0001 4.66656L13.0601 3.72656L6.0001 10.7799Z"
        fill="#09E099"
      />
    </svg>
  )
}
