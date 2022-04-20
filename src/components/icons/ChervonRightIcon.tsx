import React, { ComponentPropsWithRef } from 'react'
export function ChervonRightIcon({ ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M8.59003 16.59L13.17 12L8.59003 7.41L10 6L16 12L10 18L8.59003 16.59Z"
        fill="white"
      />
    </svg>
  )
}
