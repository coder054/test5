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
    | 'Subtitle1'
  children: ReactChild
  [rest: string]: any
}) => {
  let className1 = ''
  switch (name) {
    case 'Header6':
      className1 = ' text-[14px] xl:text-[18px] leading-[139%] font-semibold'
      break
    case 'Body2':
      className1 = 'text-[14px] leading-[157%]'
      break
    case 'body1':
      className1 = 'text-[16px] leading-[150%]'
      break
    case 'Caption':
      className1 = 'text-[12px] leading-[167%]'
      break
    case 'Header5':
      className1 = 'text-[22px] xl:text-[24px] leading-[138%] font-semibold'
      break
    case 'Subtitle2':
      className1 = 'text-[12px] xl:text-[14px] leading-[157%] font-medium'
      break
    case 'Overline':
      className1 = 'text-[12px] leading-[250%] font-semibold'
      break
    case 'Subtitle1':
      className1 = 'text-[16px] leading-[175%] font-semibold'
      break
  }
  return (
    <div {...rest} className={clsx(className1, className)}>
      {children}
    </div>
  )
}
