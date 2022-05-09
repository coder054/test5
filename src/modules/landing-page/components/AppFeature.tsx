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
    <div
      className={clsx(
        'flex flex-col justify- items-center space-y-5',
        isMobile && 'space-y-2'
      )}
    >
      <span className={clsx(isMobile && 'scale-75')}>{icon}</span>
      <p className={clsx('text-[24px] font-bold', titleColor)}>{title}</p>
      <span
        className={clsx(
          'font-semibold tracking-[1px] text-center',
          isDesktop && 'w-[280px] text-[16px]',
          isMobile && 'w-[170px] text-[14px]',
          contentColor
        )}
      >
        {content}
      </span>
    </div>
  )
}
