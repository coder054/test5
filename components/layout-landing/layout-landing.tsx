import { imgLogo } from 'imports/images'
import Image from 'next/image'
import cls from './layout-landing.module.css'

interface LayoutLandingProps {
  authen?: boolean
  children: any
}

export const LayoutLanding = ({ authen, children }: LayoutLandingProps) => {
  return (
    <div className="h-screen w-full bg-[#000000] relative overflow-hidden">
      {authen && (
        <div
          className={`${cls.backgroundAuthen} w-screen h-screen absolute`}
        ></div>
      )}
      {!authen && (
        <div className={`${cls.logo} ml-[142px] absolute`}>
          <Image src={imgLogo} alt="" />
        </div>
      )}
      <div className="w-full absolute">{children}</div>
      {!authen && (
        <>
          <div className={`${cls.vectorTop} pointer-events-none`}></div>
          <div className={`${cls.vectorBottom} absolute z-0`}></div>
        </>
      )}
    </div>
  )
}
