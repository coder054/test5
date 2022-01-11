import { imgHamburgerPurple, imgLogo } from 'imports/images'
import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'

export const Header = () => {
  return (
    <div
      style={{
        filter:
          ' drop-shadow(0px 1px 1px rgba(100, 116, 139, 0.06)) drop-shadow(0px 1px 2px rgba(100, 116, 139, 0.1))',
      }}
      className="h-[64px] w-100vw-280px left-[280px] top-0 fixed z-[1000 
        flex justify-between items-center
        "
    >
      <Image className="" src={imgHamburgerPurple} alt="" />
    </div>
  )
}
