import React, { ComponentPropsWithRef } from 'react'
export function ArrowDownIcon({
  className,
  ...rest
}: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M5.25 10.5L9 6.75L12.75 10.5H5.25Z" fill="#A2A5AD" />
    </svg>
  )
}
