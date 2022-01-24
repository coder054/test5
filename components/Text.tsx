import clsx from 'clsx'
import { ReactChild } from 'react'

export const Text = ({
  className,
  name,
  children,
  ...rest
}: {
  className: string
  name:
    | 'Header6'
    | 'Body2'
    | 'body1'
    | 'Caption'
    | 'Header5'
    | 'Subtitle2'
    | 'Overline'
  children: ReactChild
  [rest: string]: any
}) => {
  let className1 = ''
  switch (name) {
    case 'Header6':
      className1 = 'text-[18px] leading-[25px] font-semibold'
      break
    case 'Body2':
      className1 = 'text-[14px] leading-[22px]'
      break
    case 'body1':
      className1 = 'text-[16px] leading-[24px]'
      break
    case 'Caption':
      className1 = 'text-[12px] leading-[20px]'
      break
    case 'Header5':
      className1 = 'text-[24px] leading-[33px] font-semibold'
      break
    case 'Subtitle2':
      className1 = 'text-[14px] leading-[22px] font-medium'
      break
    case 'Overline':
      className1 = 'text-[12px] leading-[30px] font-semibold'
      break
  }
  return (
    <div {...rest} className={clsx(className1, className)}>
      {children}
    </div>
  )
}
