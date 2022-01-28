import { imgLogo } from 'imports/images'
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
} from 'imports/svgs'
import clsx from 'clsx'
import { ROUTES } from 'constants/constants'

const arrSidebar = [
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
  { link: ROUTES.programs, icon: SvgPrograms, text: 'Programs', active: false },
  {
    link: ROUTES.challenges,
    icon: SvgChallenges,
    text: 'Challenges',
    active: false,
  },
  { link: ROUTES.contact, icon: SvgContact, text: 'Contact', active: false },
  {
    link: ROUTES.accountAndSettings,
    icon: SvgAccount,
    text: 'Account & Settings',
    active: false,
  },
  {
    link: ROUTES.biography,
    icon: SvgBiography,
    text: 'Biography',
    active: false,
  },
  { link: ROUTES.support, icon: SvgSupport, text: 'Support', active: false },
  {
    link: ROUTES.components,
    icon: SvgSupport,
    text: 'Components',
    active: false,
  },
]

export const Sidebar = () => {
  const router = useRouter()

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
            const isActive = o.link === router.pathname

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
