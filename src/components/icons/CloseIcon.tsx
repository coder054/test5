import React, { ComponentPropsWithRef } from 'react'
export function CloseIcon({
  className,
  ...rest
}: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M8.02842 1.25586C4.55861 1.25586 1.75391 4.06057 1.75391 7.53037C1.75391 11.0002 4.55861 13.8049 8.02842 13.8049C11.4982 13.8049 14.3029 11.0002 14.3029 7.53037C14.3029 4.06057 11.4982 1.25586 8.02842 1.25586ZM11.1657 9.78292L10.281 10.6676L8.02842 8.41508L5.77587 10.6676L4.89116 9.78292L7.14371 7.53037L4.89116 5.27782L5.77587 4.39311L8.02842 6.64566L10.281 4.39311L11.1657 5.27782L8.91312 7.53037L11.1657 9.78292Z"
        fill="#9CA3AF"
      />
    </svg>
  )
}
