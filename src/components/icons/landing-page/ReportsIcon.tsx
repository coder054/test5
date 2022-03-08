import React, { ComponentPropsWithRef } from 'react'
export function ReportsIcon({
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
      <path d="M49.375 15V28.75H63.125L49.375 15Z" fill="white" />
      <path
        d="M49.375 32.1875C47.4809 32.1875 45.9375 30.6441 45.9375 28.75V15H25.3125C23.4184 15 21.875 16.5434 21.875 18.4375V66.5625C21.875 68.46 23.4184 70 25.3125 70H59.6875C61.585 70 63.125 68.46 63.125 66.5625V32.1875H49.375ZM35.625 63.125H28.75V52.8125H35.625V63.125ZM45.9375 63.125H39.0625V45.9375H45.9375V63.125ZM56.25 63.125H49.375V39.0625H56.25V63.125Z"
        fill="white"
      />
    </svg>
  )
}
