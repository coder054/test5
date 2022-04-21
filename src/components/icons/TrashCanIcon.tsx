import React, { ComponentPropsWithRef } from 'react'
export function TrashCanIcon({ ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M3.99967 12.6667C3.99967 13.4 4.59967 14 5.33301 14H10.6663C11.3997 14 11.9997 13.4 11.9997 12.6667V4.66667H3.99967V12.6667ZM12.6663 2.66667H10.333L9.66634 2H6.33301L5.66634 2.66667H3.33301V4H12.6663V2.66667Z"
        fill="#D60C0C"
      />
    </svg>
  )
}
