import React, { ComponentPropsWithRef } from 'react'
export function DashboardAppIcon({
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
      <rect x="0.833252" width="84" height="84" rx="16" fill="#4654EA" />
      <path
        d="M22.2083 44.7917H40.5416V21.875H22.2083V44.7917ZM22.2083 63.125H40.5416V49.375H22.2083V63.125ZM45.1249 63.125H63.4583V40.2083H45.1249V63.125ZM45.1249 21.875V35.625H63.4583V21.875H45.1249Z"
        fill="white"
      />
    </svg>
  )
}
