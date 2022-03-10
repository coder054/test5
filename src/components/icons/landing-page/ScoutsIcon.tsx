import React, { ComponentPropsWithRef } from 'react'
export function ScoutsIcon({
  className,
  ...rest
}: ComponentPropsWithRef<'svg'>) {
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
        d="M29.756 19.1461C29.254 14.5955 25.6419 10.9834 21.0913 10.4814V8.2334H18.9087V10.4814C14.3581 10.9834 10.746 14.5955 10.244 19.1461H7.99603V21.3286H10.244C10.746 25.8792 14.3581 29.4913 18.9087 29.9933V32.2413H21.0913V29.9933C25.6419 29.4913 29.254 25.8792 29.756 21.3286H32.004V19.1461H29.756ZM20 27.8763C15.7768 27.8763 12.3611 24.4606 12.3611 20.2374C12.3611 16.0142 15.7768 12.5985 20 12.5985C24.2232 12.5985 27.6389 16.0142 27.6389 20.2374C27.6389 24.4606 24.2232 27.8763 20 27.8763Z"
        fill="white"
      />
    </svg>
  )
}
