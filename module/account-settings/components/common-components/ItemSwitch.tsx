import clsx from 'clsx'
import { ReactElement } from 'react'

export const Item = ({
  isChecked,
  className,
  label,
  icon,
}: {
  label?: string
  isChecked?: boolean
  className?: string
  icon?: ReactElement
}) => {
  return (
    <div className={clsx('flex justify-between items-center', className)}>
      <h1
        className={clsx(
          ' text-[16px] font-medium duration-200',
          isChecked ? 'text-white' : 'text-[#818389]'
        )}
      >
        {label}
      </h1>
      <span>{icon}</span>
    </div>
  )
}
