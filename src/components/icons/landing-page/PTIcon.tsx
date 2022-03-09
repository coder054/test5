import React, { ComponentPropsWithRef } from 'react'
export function PTIcon({ className, ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect width="40" height="40" rx="8" fill="#A2A5AD" />
      <path
        d="M29.3522 23.3589L30.9127 21.7984L29.3522 20.2379L25.4564 24.1337L16.1042 14.7815L20 10.8857L18.4395 9.3252L16.879 10.8857L15.3185 9.3252L12.9832 11.6605L11.4227 10.1L9.86214 11.6605L11.4227 13.221L9.08734 15.5563L10.6479 17.1169L9.08734 18.6774L10.6479 20.2379L14.5437 16.3421L23.8959 25.6942L20 29.5901L21.5606 31.1506L23.1211 29.5901L24.6816 31.1506L27.0169 28.8153L28.5774 30.3758L30.1379 28.8153L28.5774 27.2548L30.9127 24.9194L29.3522 23.3589Z"
        fill="white"
      />
    </svg>
  )
}
