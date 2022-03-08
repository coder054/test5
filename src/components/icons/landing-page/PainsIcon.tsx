import React, { ComponentPropsWithRef } from 'react'
export function PainsIcon({
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
        d="M40.4591 65.9666C39.8958 65.5193 15 53.4432 15 35.1215C15 25.7856 21.4772 18.4717 29.6094 18.4717C36.7282 18.4717 40.7302 22.6989 41.3199 23.0444L34.0752 39.9492L46.991 49.6361L40.4591 65.9666Z"
        fill="white"
      />
      <path
        d="M43.7038 66.5284L50.8997 48.5378L38.0342 38.8887L45.4032 21.6959C45.7257 21.5364 49.3866 18.4717 55.3907 18.4717C63.5228 18.4717 70 25.7856 70 35.1215C70 53.4348 44.8878 65.5741 43.7038 66.5284Z"
        fill="white"
      />
    </svg>
  )
}
