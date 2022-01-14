import clsx from 'clsx'
import { ReactChild } from 'react'

export const Text = ({
  className,
  name,
  children,
}: {
  className: string
  name: 'Header6' | 'Body2' | 'body1'
  children: ReactChild
}) => {
  let className1 = ''
  switch (name) {
    case 'Header6':
      className1 = 'text-[18px] leading-[25px] font-semibold'
    case 'Body2':
      className1 = 'text-[14px] leading-[22px]'
    case 'body1':
      className1 = 'text-[16px] leading-[24px]'
  }
  return <div className={clsx(className1, className)}>{children}</div>
}
