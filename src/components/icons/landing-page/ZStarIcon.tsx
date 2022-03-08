import React, { ComponentPropsWithRef } from 'react'
export function ZStarIcon({
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
        d="M42.5 54.5772L56.6625 63.1252L52.9041 47.0147L65.4166 36.1752L48.9396 34.7772L42.5 19.5835L36.0604 34.7772L19.5833 36.1752L32.0958 47.0147L28.3375 63.1252L42.5 54.5772Z"
        fill="white"
      />
    </svg>
  )
}
