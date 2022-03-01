import React, { ComponentPropsWithRef } from 'react'
export function FeedAppIcon({
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
        d="M57.6404 60.7272V62.5638C57.6404 63.4127 56.9459 64.1072 56.097 64.1072H22.4362C21.5873 64.1072 20.8928 63.4127 20.8928 62.5638V28.903C20.8928 28.0541 21.5873 27.3596 22.4362 27.3596H24.2728V59.1838C24.2728 60.0327 24.9673 60.7272 25.8162 60.7272H57.6404Z"
        fill="white"
      />
      <path
        d="M62.5637 20.8928H28.9029C28.054 20.8928 27.3595 21.5873 27.3595 22.4362V56.097C27.3595 56.9459 28.054 57.6404 28.9029 57.6404H62.5637C63.4125 57.6404 64.1071 56.9459 64.1071 56.097V22.4362C64.1071 21.5873 63.4125 20.8928 62.5637 20.8928ZM54.1523 49.2136H37.3296C36.4654 49.2136 35.7863 48.5345 35.7863 47.6702C35.7863 46.8214 36.4654 46.1269 37.3296 46.1269H54.1523C55.0012 46.1269 55.6957 46.8214 55.6957 47.6702C55.6957 48.5345 55.0012 49.2136 54.1523 49.2136ZM54.1523 40.8023H37.3296C36.4654 40.8023 35.7863 40.1232 35.7863 39.2589C35.7863 38.41 36.4654 37.7155 37.3296 37.7155H54.1523C55.0012 37.7155 55.6957 38.41 55.6957 39.2589C55.6957 40.1232 55.0012 40.8023 54.1523 40.8023ZM54.1523 32.3909H37.3296C36.4654 32.3909 35.7863 31.6964 35.7863 30.8475C35.7863 29.9987 36.4654 29.3042 37.3296 29.3042H54.1523C55.0012 29.3042 55.6957 29.9987 55.6957 30.8475C55.6957 31.6964 55.0012 32.3909 54.1523 32.3909Z"
        fill="white"
      />
    </svg>
  )
}
