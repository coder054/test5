import clsx from 'clsx'
import { ReactElement } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'

type AppFeatureProps = {
  icon: ReactElement
  title: string
  content: string
  titleColor: string
  contentColor?: string
}

export const AppFeature = ({
  icon,
  title,
  content,
  titleColor,
  contentColor,
}: AppFeatureProps) => {
  return (
    <div className="flex flex-col justify- items-center space-y-5">
      {icon}
      <p className={clsx('text-[24px] font-bold', titleColor)}>{title}</p>
      <span
        className={clsx(
          'text-gray-400 font-semibold tracking-[1px] text-[16px] text-center',
          isDesktop && 'w-[280px] ',
          isMobile && 'w-[190px]',
          contentColor
        )}
      >
        {content}
      </span>
    </div>
  )
}
