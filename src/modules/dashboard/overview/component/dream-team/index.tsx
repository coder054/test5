import { TooltipCustom } from 'src/components'
import { ItemLeaderBoard } from 'src/components/leader-board-item'
import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'

const cls = require('../../overview.module.css')

interface DreamTeamProps {
  dreamTeam?: boolean
  lastDateRange?: string
  setLastDateRange?: (lastDate?: string) => void
}

const mockData = [
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Casilas',
  },
  {
    position: 'LW',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Macelo',
  },
  {
    position: 'CB',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Ramos',
  },
  {
    position: 'RB',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Varane',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Cavajan',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Kroos',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Casemilo',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Modric',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Ronaldo',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Benzema',
  },
  {
    position: 'ST',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-04-05%2011%3A33%3A25.459457?alt=media&token=973a29ea-d7d7-4c05-a27e-a4631a4f98c2',
    fullName: 'Bale',
  },
]

export const DreamTeam = ({ dreamTeam, lastDateRange }: DreamTeamProps) => {
  return (
    <div
      className={`${cls.item} w-full pt-[16px] md:pt-[32px] pl-[16px] md:pl-[32px] pr-[16px] md:pr-[35px] pb-[16px] md:pb-[38px]`}
    >
      <div className="flex justify-between">
        <p className="text-[16px] text-[#ffffff] font-bold">Dream Team</p>
        <TooltipCustom
          title="This is total leaderboard tooltip description"
          placement="top-end"
        >
          <div className="order-list cursor-pointer">
            <SvgInfomation />
          </div>
        </TooltipCustom>
      </div>
      <div className="w-[226px] mobileM:w-[265px] md:w-full overflow-y-auto ">
        <div className="w-[360px] md:w-full mb-[8px]">
          <div className="w-full flex mt-[22px]">
            <div className="flex-1">
              <div className="w-[68px] mx-auto">
                <ItemLeaderBoard dreamTeam infor={mockData[8]} />
              </div>
            </div>
            <div className="flex-1">
              <div className="w-[68px] mx-auto">
                <ItemLeaderBoard dreamTeam infor={mockData[9]} />
              </div>
            </div>
            <div className="flex-1">
              <div className="w-[68px] mx-auto">
                <ItemLeaderBoard dreamTeam infor={mockData[10]} />
              </div>
            </div>
          </div>
        </div>

        {/* CAM */}
        <div className="w-[360px] md:w-full relative h-[120px]">
          <div className="absolute w-full z-10 h-full">
            <div className="w-[calc(50%-55px)] ml-[48px] h-full absolute flex items-center">
              <div className={`${cls.borderLine} w-full`}></div>
            </div>
            <div
              className={`${cls.borderLine} w-[112px] h-[112px] rounded-full mx-auto`}
            ></div>
            <div className="right-0 top-0 w-[calc(50%-55px)] mr-[48px] h-full absolute flex items-center">
              <div className={`${cls.borderLine} w-full`}></div>
            </div>
          </div>

          <div className="absolute w-full z-20 mt-[22px]">
            <div className="w-full flex">
              <div className="flex-1 ml-[72px]">
                <div className="w-[68px] mx-auto">
                  <ItemLeaderBoard dreamTeam infor={mockData[5]} />
                </div>
              </div>
              <div className="flex-1">
                <div className="w-[68px] mx-auto">
                  <ItemLeaderBoard dreamTeam infor={mockData[6]} />
                </div>
              </div>
              <div className="flex-1 mr-[72px]">
                <div className="w-[68px] mx-auto">
                  <ItemLeaderBoard dreamTeam infor={mockData[7]} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[360px] md:w-full mt-[12px]">
          <div className="w-full flex">
            <div className="flex-1">
              <div className="w-[68px] mx-auto">
                <ItemLeaderBoard dreamTeam infor={mockData[1]} />
              </div>
            </div>
            <div className="flex-1">
              <div className="w-[68px] mx-auto">
                <ItemLeaderBoard dreamTeam infor={mockData[2]} />
              </div>
            </div>
            <div className="flex-1">
              <div className="w-[68px] mx-auto">
                <ItemLeaderBoard dreamTeam infor={mockData[3]} />
              </div>
            </div>
            <div className="flex-1">
              <div className="w-[68px] mx-auto">
                <ItemLeaderBoard dreamTeam infor={mockData[4]} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[360px] md:w-full mt-[12px]">
          <div className="w-full">
            <div className="w-[68px] mx-auto">
              <ItemLeaderBoard dreamTeam infor={mockData[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
