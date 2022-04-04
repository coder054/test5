import { ItemLeaderBoard } from 'src/components/leader-board-item'
import { SvgAllowRight, SvgInfomation } from 'src/imports/svgs'

const cls = require('../../overview.module.css')

interface DreamTeamProps {}

const mockData = [
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-03-16%2013%3A51%3A05.255841?alt=media&token=50e1f401-7c8b-4616-ac07-0ec6f9b09e67',
    fullName: 'Casilas',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fcc-4945-1519631236_680x0.jpg?alt=media&token=31cc9f80-c1ff-4922-bf5d-21fb6d2bf411',
    fullName: 'Macelo',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-03-16%2013%3A51%3A05.255841?alt=media&token=50e1f401-7c8b-4616-ac07-0ec6f9b09e67',
    fullName: 'Varane',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-03-16%2013%3A51%3A05.255841?alt=media&token=50e1f401-7c8b-4616-ac07-0ec6f9b09e67',
    fullName: 'Ramos',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fcc-4945-1519631236_680x0.jpg?alt=media&token=31cc9f80-c1ff-4922-bf5d-21fb6d2bf411',
    fullName: 'Cavajan',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-03-16%2013%3A51%3A05.255841?alt=media&token=50e1f401-7c8b-4616-ac07-0ec6f9b09e67',
    fullName: 'Casemilo',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fcc-4945-1519631236_680x0.jpg?alt=media&token=31cc9f80-c1ff-4922-bf5d-21fb6d2bf411',
    fullName: 'Kroos',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev-media/o/media%2F2022-03-16%2013%3A51%3A05.255841?alt=media&token=50e1f401-7c8b-4616-ac07-0ec6f9b09e67',
    fullName: 'Modric',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fcc-4945-1519631236_680x0.jpg?alt=media&token=31cc9f80-c1ff-4922-bf5d-21fb6d2bf411',
    fullName: 'Mbape',
  },
  {
    position: 'GK',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fcc-4945-1519631236_680x0.jpg?alt=media&token=31cc9f80-c1ff-4922-bf5d-21fb6d2bf411',
    fullName: 'Messi',
  },
  {
    position: 'ST',
    faceImage:
      'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/files%2Fcc-4945-1519631236_680x0.jpg?alt=media&token=31cc9f80-c1ff-4922-bf5d-21fb6d2bf411',
    fullName: 'Ronaldo',
  },
]

export const DreamTeam = () => {
  return (
    <div
      className={`${cls.item} w-full pt-[32px] pl-[32px] pr-[35px] pb-[38px]`}
    >
      <div className="flex justify-between">
        <p className="text-[16px] text-[#ffffff] font-bold">Dream Team</p>
        <div className="order-list">
          <SvgInfomation />
        </div>
      </div>

      <div className="w-full mb-[8px]">
        <div className="w-full flex mt-[22px]">
          <div className="flex-1">
            <div className="w-[68px] mx-auto">
              <ItemLeaderBoard infor={mockData[8]} />
            </div>
          </div>
          <div className="flex-1">
            <div className="w-[68px] mx-auto">
              <ItemLeaderBoard infor={mockData[9]} />
            </div>
          </div>
          <div className="flex-1">
            <div className="w-[68px] mx-auto">
              <ItemLeaderBoard infor={mockData[10]} />
            </div>
          </div>
        </div>
      </div>

      {/* CAM */}
      <div className="w-full relative h-[120px]">
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
                <ItemLeaderBoard infor={mockData[5]} />
              </div>
            </div>
            <div className="flex-1">
              <div className="w-[68px] mx-auto">
                <ItemLeaderBoard infor={mockData[6]} />
              </div>
            </div>
            <div className="flex-1 mr-[72px]">
              <div className="w-[68px] mx-auto">
                <ItemLeaderBoard infor={mockData[7]} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-[12px]">
        <div className="w-full flex">
          <div className="flex-1">
            <div className="w-[68px] mx-auto">
              <ItemLeaderBoard infor={mockData[1]} />
            </div>
          </div>
          <div className="flex-1">
            <div className="w-[68px] mx-auto">
              <ItemLeaderBoard infor={mockData[2]} />
            </div>
          </div>
          <div className="flex-1">
            <div className="w-[68px] mx-auto">
              <ItemLeaderBoard infor={mockData[3]} />
            </div>
          </div>
          <div className="flex-1">
            <div className="w-[68px] mx-auto">
              <ItemLeaderBoard infor={mockData[4]} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-[12px]">
        <div className="w-full flex">
          <div className="flex-1">
            <div className="w-[68px] mx-auto">
              <ItemLeaderBoard infor={mockData[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
