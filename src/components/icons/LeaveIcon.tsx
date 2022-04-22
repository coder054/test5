import React, { ComponentPropsWithRef } from 'react'
export function LeaveIcon({ ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M55 30L42.5 20L42.5 27.5L20 27.5L20 32.5L42.5 32.5L42.5 40L55 30Z"
        fill="#D60C0C"
      />
      <path
        d="M27.4963 52.5029C33.5087 52.5029 39.1588 50.1604 43.4063 45.9104L39.8713 42.3754C36.5663 45.6804 32.1713 47.5029 27.4963 47.5029C22.8213 47.5029 18.4263 45.6804 15.1213 42.3754C11.8163 39.0704 9.99375 34.6754 9.99375 30.0004C9.99375 25.3254 11.8163 20.9304 15.1213 17.6254C18.4263 14.3204 22.8213 12.4979 27.4963 12.4979C32.1713 12.4979 36.5663 14.3204 39.8713 17.6254L43.4063 14.0904C39.1588 9.84043 33.5088 7.49794 27.4963 7.49793C21.4838 7.49793 15.8338 9.84043 11.5863 14.0904C7.33626 18.3379 4.99375 23.9879 4.99375 30.0004C4.99375 36.0129 7.33626 41.6629 11.5863 45.9104C15.8338 50.1604 21.4838 52.5029 27.4963 52.5029Z"
        fill="#D60C0C"
      />
    </svg>
  )
}
