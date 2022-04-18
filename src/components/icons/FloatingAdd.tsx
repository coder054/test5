import React, { ComponentPropsWithRef } from 'react'
export function FloatingAdd({ ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="92"
      height="92"
      viewBox="0 0 92 92"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g filter="url(#filter0_d_2942_59772)">
        <rect x="6" y="4" width="80" height="80" rx="40" fill="#4654EA" />
        <path
          d="M57.6654 45.6668H47.6654V55.6668H44.332V45.6668H34.332V42.3335H44.332V32.3335H47.6654V42.3335H57.6654V45.6668Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2942_59772"
          x="0"
          y="0"
          width="92"
          height="92"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.392157 0 0 0 0 0.454902 0 0 0 0 0.545098 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2942_59772"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2942_59772"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
