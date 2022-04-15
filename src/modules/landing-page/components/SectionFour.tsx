import clsx from 'clsx'
import Image from 'next/image'
import { isDesktop } from 'react-device-detect'
import {
  AgentsIcon,
  DoubleQuote2Icon,
  ManagerIcon,
  PTIcon,
  ScoutsIcon,
} from 'src/components/icons'
import {
  APPSTORE_BLACK,
  COMMENT_AVATAR_2,
  DEVICES,
  GG_PLAY_BLACK,
  GROUP,
} from 'src/imports/images'

export const SectionFour = () => {
  return (
    <div className="bg-white laptopM:h-[1980px] mobileM:h-[2180px] mobileL:h-[2100px]">
      <div className="mobileM:w-full laptopM:w-[1320px] laptopM:py-32 laptopM:mx-auto mobileM:px-[30px] relative">
        <div className="flex justify-between">
          {isDesktop && <Image src={GROUP} />}
          <div className={clsx('space-y-4 w-[400px] pt-28')}>
            <span className="text-center font-semibold text-[#17C78D] text-[14px] tracking-[2px]">
              TESTIMONIAL
            </span>
            <p className="text-black text-[36px] font-bold relative">
              {isDesktop && (
                <span className="absolute -right-12 top-[14px]">
                  <DoubleQuote2Icon />
                </span>
              )}
              Coaches giving me instant feedback helps me learn faster
            </p>
            <div className="flex space-x-4">
              <Image src={COMMENT_AVATAR_2} />
              <span className="text-black">
                <p className="text-[18px] font-semibold">Hanna Schaffner</p>
                <p className="text-[14px] font-normal">
                  Midfielder, Sollentuna FK
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="absolute laptopM:top-[770px] mobileM:top-[500px]">
          <div className="grid laptopM:grid-cols-3 mobileM:grid-cols-1 mobileL:px-[20px] laptopM:px-0 mobileM:space-y-4 laptopM:space-x-9 text-[#6B7280] font-medium text-[16px]">
            <p className="text-black text-[36px] font-extrabold">
              Supporting Agents, PT's, Scouts & Managers as well.
            </p>
            <p className="laptopM:pt-7">
              Zporter are built by old players for young players. And as old
              players, we know hom important it is for a young player to have a
              good dialogue and support from Agents, Physios and Personal
              Trainers.
            </p>
            <p className="laptopM:pt-7">
              Just as important it is to simplify for Scouts and Club Managers
              to find and follow the players they are interested of. We’ve got
              services coming for them as well in Q4 2022 and 2023.
            </p>
          </div>
          <div className="grid laptopM:grid-cols-12 laptopM:space-x-16 laptopM:pt-36 mobileM:pt-16 mobileM:grid-cols-1 mobileM:pr-[30px]">
            <div className="col-span-5 space-y-9">
              <div className="flex flex-col items-start space-y-4">
                <AgentsIcon />
                <p className="font-bold text-[#111827] text-[18px]">Agents</p>
                <p className="font-normal text-[#6B7280]">
                  Follow, support and share what you do for your clients
                </p>
                <ul className="text-black font-medium text-[16px] list-disc pl-7">
                  <li>Chat with and report what you do for your clients</li>
                  <li>Follow players feeds and development</li>
                  <li>Share your players Biographies & Health data</li>
                  <li>Simplify how to scout and find new clients</li>
                </ul>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <ScoutsIcon />
                <p className="font-bold text-[#111827] text-[18px]">Scouts</p>
                <p className="font-normal text-[#6B7280]">
                  Simplify how to find, follow, benchmark and contact as well as
                  create reports on the most interesting players.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <PTIcon />
                <p className="font-bold text-[#111827] text-[18px]">
                  PT's & Physios
                </p>
                <p className="font-normal text-[#6B7280]">
                  Run tests, challenges and programs as well as events on- and
                  offline with payments embedded to develop and rehab their
                  clients.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <ManagerIcon />
                <p className="font-bold text-[#111827] text-[18px]">
                  Club & Team Managers
                </p>
                <p className="font-normal text-[#6B7280]">
                  Find, contact and contract new and manage existing players.
                  With invites to trainings, matches, camps and tournaments etc.
                </p>
              </div>
            </div>
            <div className="col-span-7 flex flex-col items-center justify-center laptopM:pt-9 mobileM:pt-0">
              {isDesktop && <Image src={DEVICES} />}
              <div className="pt-20 space-x-3 ">
                <Image src={APPSTORE_BLACK} />
                <Image src={GG_PLAY_BLACK} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
