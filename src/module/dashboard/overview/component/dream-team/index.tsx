import { TooltipCustom } from 'src/components'
import { ItemLeaderBoard } from 'src/components/leader-board-item'
import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'

const cls = require('../../overview.module.css')

interface DreamTeamProps {
  dreamTeam?: boolean
}

const mockData = [
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fiker-casillas-696x463-15499437-7503-1560-1549944258.png?alt=media&token=55845124-90c9-49dc-b08a-0f49823b3a3b',
    fullName: 'Casilas',
  },
  {
    position: 'LW',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2FMarcelo%20Tu%20cau%20nhoc%20bi%20loai%20bo%20den%20bieu%20tuong%20o%20Bernabeu.jpg?alt=media&token=5c996f23-39ce-42a6-ab4c-cdeb1e3f21fa',
    fullName: 'Macelo',
  },
  {
    position: 'CB',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fcc-4945-1519631236_680x0.jpg?alt=media&token=0253924f-9f8b-4a46-bc73-f37570acbb91',
    fullName: 'Ramos',
  },
  {
    position: 'RB',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2F2989230-61340328-2560-1440.jpg?alt=media&token=5825d6e3-6442-43ec-827c-9a1f694e869d',
    fullName: 'Varane',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2F_EEC3188%2C1.jpg?alt=media&token=32a0f274-6a1f-4e3b-8f74-18187267804f',
    fullName: 'Cavajan',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fdownload%20(1).jpg?alt=media&token=bccd278b-6d52-42cb-b34c-a1ea19478f37',
    fullName: 'Kroos',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2F3F5C8FA100000578-0-image-a-55_1492546598797.jpg?alt=media&token=d0c1ff3d-c736-4773-981b-3f8915b9afd7',
    fullName: 'Casemilo',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2F03982c12b5c1a9ecee46aa1a22d257e3.jpg?alt=media&token=b35075a4-c82d-4b82-9157-b138dd6b0cde',
    fullName: 'Modric',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fimages.jpg?alt=media&token=e1768870-1164-4fc1-bbd3-984896bb2466',
    fullName: 'Ronaldo',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2FIMG-20211002-WA0037.jpg?alt=media&token=9fa1cfd6-e0a8-47e0-92b5-a357cb8f1468',
    fullName: 'Benzema',
  },
  {
    position: 'ST',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2F2018-04-11t185904z445469918rc1439480420rtrmadp3soccer-champions-mad-juv-15252409921241210889420.jpg?alt=media&token=e553b277-3dc1-44a2-a658-6e90666a6489',
    fullName: 'Bale',
  },
]

export const DreamTeam = ({ dreamTeam }: DreamTeamProps) => {
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
