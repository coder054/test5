import { ReactElement } from 'react'
import { DiaryAppIcon } from 'src/components/icons'

type AppFeatureProps = {
  icon: ReactElement
  title: string
  content: string
}

export const AppFeature = ({ icon, title, content }: AppFeatureProps) => {
  return (
    <div className="flex flex-col justify- items-center space-y-5">
      {icon}
      <p className="text-black text-[24px] font-bold">{title}</p>
      <span className="text-gray-400 font-semibold w-[280px] tracking-[1px] text-[16px] text-center">
        {content}
      </span>
    </div>
  )
}
