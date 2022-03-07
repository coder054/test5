import React, { ComponentPropsWithRef } from 'react'
export function DoubleQuoteIcon({
  className,
  ...rest
}: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="40"
      height="30"
      viewBox="0 0 40 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M37 29.1666H28.5L22.8333 17.8333V0.833252H39.8333V17.8333H31.3333L37 29.1666ZM14.3333 29.1666H5.83331L0.166641 17.8333V0.833252H17.1666V17.8333H8.66664L14.3333 29.1666Z"
        fill="#25262F"
        fill-opacity="0.68"
      />
    </svg>
  )
}
