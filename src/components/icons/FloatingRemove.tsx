import React, { ComponentPropsWithRef } from 'react'
export function FloatingRemove({ ...rest }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g filter="url(#filter0_d_2942_61139)">
        <path
          d="M19.799 59.3971C8.86431 48.4625 8.86431 30.7338 19.799 19.7992C30.7337 8.86447 48.4623 8.86448 59.397 19.7992C70.3316 30.7338 70.3316 48.4625 59.397 59.3971C48.4623 70.3318 30.7337 70.3318 19.799 59.3971Z"
          fill="#1E1F24"
        />
        <g clip-path="url(#clip0_2942_61139)">
          <g filter="url(#filter1_d_2942_61139)">
            <path
              d="M45.2556 35.3555L41.0129 39.5981L45.2556 43.8408L43.8414 45.255L39.5987 41.0124L35.3561 45.255L33.9419 43.8408L38.1845 39.5981L33.9419 35.3555L35.3561 33.9413L39.5987 38.1839L43.8414 33.9413L45.2556 35.3555Z"
              fill="white"
            />
            <path
              d="M39.9523 38.5375L43.8414 34.6484L44.5485 35.3555L40.6594 39.2446L40.3058 39.5981L40.6594 39.9517L44.5485 43.8408L43.8414 44.5479L39.9523 40.6588L39.5987 40.3053L39.2452 40.6588L35.3561 44.5479L34.649 43.8408L38.5381 39.9517L38.8916 39.5981L38.5381 39.2446L34.649 35.3555L35.3561 34.6484L39.2452 38.5375L39.5987 38.891L39.9523 38.5375Z"
              stroke="white"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_2942_61139"
          x="-6"
          y="-4"
          width="91.1953"
          height="91.1963"
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
            result="effect1_dropShadow_2942_61139"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2942_61139"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_2942_61139"
          x="29.9414"
          y="33.9414"
          width="19.3125"
          height="19.3135"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2942_61139"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2942_61139"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_2942_61139">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(22.6289 39.5981) rotate(-45)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
