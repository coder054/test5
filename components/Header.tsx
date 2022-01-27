import {
  imgAvatar,
  imgBell,
  imgHamburgerPurple,
  imgMessage,
  imgSearch,
} from 'imports/images'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import clsx from 'clsx'
import { ROUTES } from 'constants/constants'
import { useMemo, useState } from 'react'
import { DropdownUser } from './specific/DropdownUser'

export const Header = () => {
  const router = useRouter()
  const [showDropdownUser, setShowDropdownUser] = useState(false)

  const titleHeader = useMemo(() => {
    switch (router.pathname) {
      case ROUTES.feed:
        return 'Feed'
      case ROUTES.dashboard:
        return 'Dashboard'
      case ROUTES.test:
        return 'Test'
      case ROUTES.programs:
        return 'Programs'
      case ROUTES.challenges:
        return 'Challenges'
      case ROUTES.contact:
        return 'Contact'
      case ROUTES.accountAndSettings:
        return 'Account & Settings'
      case ROUTES.biography:
        return 'Biology'
      case ROUTES.support:
        return 'Support'
      case ROUTES.components:
        return 'Components'

      default:
        return ''
    }
  }, [router.pathname])

  return (
    <div
      style={{
        filter:
          ' drop-shadow(0px 1px 1px rgba(100, 116, 139, 0.06)) drop-shadow(0px 1px 2px rgba(100, 116, 139, 0.1))',
      }}
      className="h-[64px] w-100vw-280px left-[280px] top-0 fixed z-[1000]
        flex justify-between items-center
        px-[39px]
        bg-[#111115]
        "
    >
      <div
        className={clsx(
          ` absolute w-[100px] h-[25px] right-[200px] bottom-[-25px] `,
          showDropdownUser ? '  ' : ' hidden '
        )}
      >
        <DropdownUser />
      </div>
      <div className="mr-[9px] w-[32px] h-[32px] ">
        <Image className="" src={imgHamburgerPurple} alt="" />
      </div>
      <span className="font-semibold text-white text-[24px] leading-[33px] ">
        {titleHeader}
      </span>
      <span className=" grow "></span>
      <Image className="" src={imgSearch} alt="" />
      <Image className="" src={imgBell} alt="" />
      <div className="mr-2 w-10 h-10 ">
        <Image className="" src={imgMessage} alt="" />
      </div>

      <img
        onClick={() => {
          setShowDropdownUser(!showDropdownUser)
        }}
        src={'/header/Avatar.svg'}
        className="border cursor-pointer "
        alt=""
      />
    </div>
  )
}
