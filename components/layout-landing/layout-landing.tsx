import { imgLogo } from 'imports/images'
import Image from 'next/image'
import cls from './layout-landing.module.css'

export const LayoutLanding = ({ children }: { children: any }) => {
  return (
    <div className="h-screen w-full bg-[#000000] relative">
      <div className={`${cls.logo} ml-[142px] absolute`}>
        <Image src={imgLogo} alt="" />
      </div>
      <div className="w-full absolute">{children}</div>
      <div className={`${cls.vectorTop}`}></div>
      <div className={`${cls.vectorBottom}`}></div>
    </div>
  )
}
