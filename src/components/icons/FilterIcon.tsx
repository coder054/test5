import React, { ComponentPropsWithRef } from 'react'
export function FilterIcon({ ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="3 3 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M4 11H16V13H4V11ZM4 6H20V8H4V6ZM4 18H11H11.235V16H11H4V18Z"
        fill="white"
      />
    </svg>
  )
}
