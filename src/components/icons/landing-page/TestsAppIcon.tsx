import React, { ComponentPropsWithRef } from 'react'
export function TestsAppIcon({
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
        d="M62.1396 49.0541L65.4166 45.777L62.1396 42.4999L53.9583 50.6812L34.3187 31.0416L42.5 22.8603L39.2229 19.5833L35.9458 22.8603L32.6687 19.5833L27.7646 24.4874L24.4875 21.2103L21.2104 24.4874L24.4875 27.7645L19.5833 32.6687L22.8604 35.9458L19.5833 39.2228L22.8604 42.4999L31.0416 34.3187L50.6812 53.9583L42.5 62.1395L45.7771 65.4166L49.0541 62.1395L52.3312 65.4166L57.2354 60.5124L60.5125 63.7895L63.7896 60.5124L60.5125 57.2353L65.4166 52.3312L62.1396 49.0541Z"
        fill="white"
      />
    </svg>
  )
}
