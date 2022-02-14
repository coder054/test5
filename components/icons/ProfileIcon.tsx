import React, { ComponentPropsWithRef } from 'react'
export function ProfileIcon({
  className,
  ...rest
}: ComponentPropsWithRef<'svg'>) {
  return (
    <svg
      className="mr-[8px] "
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6 11.9999C21.6 14.546 20.5886 16.9878 18.7882 18.7881C16.9879 20.5885 14.5461 21.5999 12 21.5999C9.45392 21.5999 7.01212 20.5885 5.21177 18.7881C3.41142 16.9878 2.39999 14.546 2.39999 11.9999C2.39999 9.45382 3.41142 7.01203 5.21177 5.21168C7.01212 3.41133 9.45392 2.3999 12 2.3999C14.5461 2.3999 16.9879 3.41133 18.7882 5.21168C20.5886 7.01203 21.6 9.45382 21.6 11.9999ZM14.4 8.3999C14.4 9.03642 14.1471 9.64687 13.697 10.097C13.247 10.547 12.6365 10.7999 12 10.7999C11.3635 10.7999 10.753 10.547 10.3029 10.097C9.85285 9.64687 9.59999 9.03642 9.59999 8.3999C9.59999 7.76338 9.85285 7.15293 10.3029 6.70285C10.753 6.25276 11.3635 5.9999 12 5.9999C12.6365 5.9999 13.247 6.25276 13.697 6.70285C14.1471 7.15293 14.4 7.76338 14.4 8.3999ZM12 13.1999C10.8511 13.1997 9.72633 13.5293 8.75929 14.1496C7.79226 14.7699 7.02365 15.6548 6.54479 16.6991C7.22001 17.4846 8.05712 18.1148 8.99873 18.5465C9.94033 18.9781 10.9642 19.201 12 19.1999C13.0358 19.201 14.0597 18.9781 15.0013 18.5465C15.9429 18.1148 16.78 17.4846 17.4552 16.6991C16.9763 15.6548 16.2077 14.7699 15.2407 14.1496C14.2737 13.5293 13.1489 13.1997 12 13.1999Z"
        fill="white"
      />
    </svg>
  )
}
