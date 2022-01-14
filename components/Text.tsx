import clsx from 'clsx'
import { ReactChild } from 'react'

export const Text = ({
  className,
  name,
  children,
}: {
  className: string
  name: 'Header6' | 'Header7'
  children: ReactChild
}) => {
  let className1 = ''
  switch (name) {
    case 'Header6':
      className1 = 'text-[18px] leading-[25px] font-semibold'
  }
  return <div className={clsx(className1, className)}>{children}</div>
}
