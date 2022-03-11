import clsx from 'clsx'
import { ReactElement } from 'react'

type BackGroundProps = {
  label: string
  className?: string
  contentClass: string
  children: ReactElement
}

export const BackGround = ({
  label,
  className,
  contentClass,
  children,
}: BackGroundProps) => {
  return (
    <div
      className={clsx(
        'bg-[#202128cc] rounded-[8px] px-8 py-9 xl:w-[900px] xl:flex justify-between space-y-6 xl:space-y-0',
        className
      )}
    >
      <h1 className="text-white text-[16px] font-semibold">{label}</h1>
      <div className={clsx(contentClass)}>{children}</div>
    </div>
  )
}
