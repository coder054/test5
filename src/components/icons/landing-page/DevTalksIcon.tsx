import React, { ComponentPropsWithRef } from 'react'
export function DevTalksIcon({
  className,
  ...rest
}: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="85"
      height="84"
      viewBox="0 0 85 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect x="0.5" width="84" height="84" rx="16" fill="#4654EA" />
      <path
        d="M60.8333 19.5835H24.1666C21.6458 19.5835 19.6062 21.646 19.6062 24.1668L19.5833 65.4168L28.75 56.2502H60.8333C63.3541 56.2502 65.4166 54.1877 65.4166 51.6668V24.1668C65.4166 21.646 63.3541 19.5835 60.8333 19.5835ZM56.25 47.0835H28.75V42.5002H56.25V47.0835ZM56.25 40.2085H28.75V35.6252H56.25V40.2085ZM56.25 33.3335H28.75V28.7502H56.25V33.3335Z"
        fill="white"
      />
    </svg>
  )
}
