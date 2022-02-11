import React, { ComponentPropsWithRef } from 'react'
export function LogoutIcon({
  className,
  ...rest
}: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M2.5 12L7.5 16V13H16.5V11H7.5V8L2.5 12Z" fill="#D60C0C" />
      <path
        d="M13.501 2.99805C11.096 2.99805 8.83599 3.93505 7.13699 5.63505L8.55099 7.04905C9.87299 5.72705 11.631 4.99805 13.501 4.99805C15.371 4.99805 17.129 5.72705 18.451 7.04905C19.773 8.37105 20.502 10.129 20.502 11.999C20.502 13.869 19.773 15.627 18.451 16.949C17.129 18.271 15.371 19 13.501 19C11.631 19 9.87299 18.271 8.55099 16.949L7.13699 18.363C8.83599 20.063 11.096 21 13.501 21C15.906 21 18.166 20.063 19.865 18.363C21.565 16.664 22.502 14.404 22.502 11.999C22.502 9.59405 21.565 7.33405 19.865 5.63505C18.166 3.93505 15.906 2.99805 13.501 2.99805Z"
        fill="#D60C0C"
      />
    </svg>
  )
}
