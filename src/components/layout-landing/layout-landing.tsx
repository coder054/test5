import { imgLogo } from 'src/imports/images'
import Image from 'next/image'
import { GuestGuard } from '../authentication/guest-guard'
const cls = require('./layout-landing.module.css')

interface LayoutLandingProps {
  authen?: boolean
  children: any
}

export const LayoutLanding = ({ authen, children }: LayoutLandingProps) => {
  return (
    <GuestGuard>
      <div className="w-full min-h-screen bg-[#000000] relative overflow-hidden">
        {authen && (
          <div
            className={`${cls.backgroundAuthen} w-screen min-h-screen absolute`}
          ></div>
        )}
        {!authen && (
          <div className={`${cls.logo} ml-[142px] mt-[24px] lg:mt-[65px]`}>
            <Image src={imgLogo} alt="" />
          </div>
        )}
        <div className="w-full">{children}</div>
        {!authen && (
          <>
            <div className={`${cls.vectorTop} pointer-events-none`}></div>
            <div className={`${cls.vectorBottom} `}></div>
          </>
        )}
      </div>
    </GuestGuard>
  )
}
