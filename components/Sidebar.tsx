import { imgLogo } from 'imports/images'
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
} from 'imports/svgs'
import clsx from 'clsx'

const arrSidebar = [
  { link: '/feed', icon: SvgFeed, text: 'Feed', active: true },
  { link: '/dashboard', icon: SvgDashboard, text: 'Dashboard', active: false },
  { link: '/test', icon: SvgTest, text: 'Test', active: false },
  { link: '/programs', icon: SvgPrograms, text: 'Programs', active: false },
  {
    link: '/challenges',
    icon: SvgChallenges,
    text: 'Challenges',
    active: false,
  },
  { link: '/contact', icon: SvgContact, text: 'Contact', active: false },
  {
    link: '/account-and-settings',
    icon: SvgAccount,
    text: 'Account & Settings',
    active: false,
  },
  { link: '/biography', icon: SvgBiography, text: 'Biography', active: false },
  { link: '/support', icon: SvgSupport, text: 'Support', active: false },
]

export const Sidebar = () => {
  let pathname = ''
  if (typeof window !== undefined) {
    pathname = window.location.pathname
  }

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
            const isActive = o.link === pathname

            return (
              <li
                className={clsx(
                  `h-[40px] rounded-[8px] mb-1 `,
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
                      className=" text-[14px] leading-[24px] text-Neutral-300
                  font-semibold "
                    >
                      {o.text}
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
