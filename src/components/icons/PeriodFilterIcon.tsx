import React, { ComponentPropsWithRef } from 'react'
export function PeriodFilterIcon({
  className,
  ...rest
}: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M10.667 29.3333H42.667V34.6667H10.667V29.3333ZM10.667 16H53.3337V21.3333H10.667V16ZM10.667 48H29.3337H29.9603V42.6667H29.3337H10.667V48Z"
        fill="#09E099"
      />
    </svg>
  )
}
