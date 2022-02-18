import { IconButton, Menu } from '@mui/material'
import { ROUTES } from 'src/constants/constants'
import {
  imgBell,
  imgHamburgerPurple,
  imgMessage,
  imgSearch,
} from 'src/imports/images'
import { isEmpty } from 'lodash'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { DropdownUser } from './specific/DropdownUser'
import { useAuth } from 'src/module/authen/auth/AuthContext'

export const Header = () => {
  const { tokenData } = useAuth()
  const router = useRouter()
  // const [showDropdownUser, setShowDropdownUser] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const titleHeader = useMemo(() => {
    switch (router.pathname) {
      case ROUTES.feed:
        return 'Feed'
      case ROUTES.dashboard:
        return 'Dashboard'
      case ROUTES.news:
        return 'News'
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
      className={`${
        !!tokenData ? 'h-[64px]' : 'h-[80px]'
      } w-100vw-280px left-[280px] top-0 fixed z-[1000]
        flex justify-between items-center
        px-[39px]
        bg-[#111115]
        `}
    >
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiList-padding': {
            padding: 0,
          },
          '& .MuiPaper-root': {
            backgroundColor: '#111115',
          },
        }}
      >
        <DropdownUser />
      </Menu>
      <div className="mr-[9px] w-[32px] h-[32px] ">
        <Image className="" src={imgHamburgerPurple} alt="" />
      </div>
      <span className="font-semibold text-white text-[24px] leading-[33px] ">
        {titleHeader}
      </span>
      <span className=" grow "></span>
      {!isEmpty(tokenData) ? (
        <>
          <Image className="" src={imgSearch} alt="" />
          <Image className="" src={imgBell} alt="" />
          <div className="mr-2 w-10 h-10 ">
            <Image className="" src={imgMessage} alt="" />
          </div>

          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            // aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {/* eslint-disable-next-line */}
            <img src={'/header/Avatar.svg'} className="border" alt="" />
          </IconButton>
        </>
      ) : (
        <div className=" animate-appear  ">
          <Link href="/signin">
            <a>
              <button className="w-[224px] h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-Blue mr-[26px]">
                Sign In
              </button>
            </a>
          </Link>

          <Link href="/signup">
            <a>
              <button className="w-[224px] h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-transparent text-Green border border-Green ">
                Sign Up
              </button>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}
