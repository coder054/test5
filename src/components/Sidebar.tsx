import { imgLogo } from 'src/imports/images'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {
  SvgAccount,
  SvgBiography,
  SvgChallenges,
  SvgContact,
  SvgDashboard,
  SvgFeed,
  SvgPrograms,
  SvgSupport,
  SvgTest,
  SvgNews,
} from 'src/imports/svgs'
import clsx from 'clsx'
import { LOCAL_STORAGE_KEY, ROUTES } from 'src/constants/constants'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { useEffect, useMemo, useState } from 'react'

export const Sidebar = () => {
  const router = useRouter()

  const [arrSidebar, setArrSidebar] = useState<any>([])

  useEffect(() => {
    let currentRoleLocalStorage = ''
    if (typeof window !== 'undefined') {
      currentRoleLocalStorage =
        window.localStorage.getItem(LOCAL_STORAGE_KEY.currentRoleId) || ''
    }

    setArrSidebar([
      { link: ROUTES.feed, icon: SvgFeed, text: 'Feed', active: true },
      {
        link: ROUTES.dashboard,
        icon: SvgDashboard,
        text: 'Dashboard',
        active: false,
      },
      {
        link: ROUTES.news,
        icon: SvgNews,
        text: 'News',
        active: false,
      },
      { link: ROUTES.test, icon: SvgTest, text: 'Test', active: false },
      {
        link: ROUTES.programs,
        icon: SvgPrograms,
        text: 'Programs',
        active: false,
      },
      {
        link: ROUTES.challenges,
        icon: SvgChallenges,
        text: 'Challenges',
        active: false,
      },
      {
        link: ROUTES.contact,
        icon: SvgContact,
        text: 'Contact',
        active: false,
      },
      {
        link: ROUTES.accountAndSettings,
        icon: SvgAccount,
        text: 'Account & Settings',
        active: false,
      },
      {
        link: `/biography/${currentRoleLocalStorage}`,
        icon: SvgBiography,
        text: 'Biography',
        active: false,
      },
      {
        link: ROUTES.support,
        icon: SvgSupport,
        text: 'Support',
        active: false,
      },
      {
        link: ROUTES.components,
        icon: SvgSupport,
        text: 'Components',
        active: false,
      },
    ])
  }, [])

  return (
    <div
      className=" bg-Neutral-900 w-[280px] h-screen fixed overflow-auto
    z-50 "
    >
      <div className="ml-[24px] mt-[33px] mb-[33px] ">
        <Image src={imgLogo} alt="" />
      </div>

      <div className="px-[16px] ">
        <div className=" font-semibold text-Neutral-400 text-[12px] leading-[30px] uppercase mb-1 ">
          General
        </div>

        <ul>
          {arrSidebar.map((o, index) => {
            const isActive = o.link === router.asPath
            // console.log('aaa o.link', o.link)
            // console.log('aaa router.pathname', router.pathname)
            // if (router.pathname === '/biography/[userid]') {
            //   debugger
            // }

            return (
              <li
                className={clsx(
                  `h-[40px] rounded-[8px] mb-1 hover:bg-lightestGray duration-200`,
                  isActive ? ' bg-lightestGray ' : ''
                )}
                key={index}
              >
                <Link href={o.link}>
                  <a className=" w-full h-full px-[24px] flex items-center">
                    <span className=" mr-[8px] inline-block ">
                      <o.icon active={isActive} />
                    </span>
                    <span
                      className={clsx(
                        ` text-[14px] leading-[24px] text-Neutral-300
                        font-semibold `,
                        isActive ? ' text-Yellow ' : '  '
                      )}
                    >
                      {o.text}{' '}
                    </span>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
