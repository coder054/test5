import React, { ComponentPropsWithRef } from 'react'
export function MessagesIcon({
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
        d="M60.8333 19.583H24.1666C21.6458 19.583 19.6062 21.6455 19.6062 24.1663L19.5833 65.4163L28.75 56.2497H60.8333C63.3541 56.2497 65.4166 54.1872 65.4166 51.6663V24.1663C65.4166 21.6455 63.3541 19.583 60.8333 19.583ZM28.75 35.6247H56.25V40.208H28.75V35.6247ZM47.0833 47.083H28.75V42.4997H47.0833V47.083ZM56.25 33.333H28.75V28.7497H56.25V33.333Z"
        fill="white"
      />
    </svg>
  )
}
