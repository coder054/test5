import Image from 'next/image'
import { UserInforType } from 'src/constants/types'
import clsx from 'clsx'
import React from 'react'

interface ItemLeaderBoardProps {
  master?: boolean
  tabLeaderBoard?: boolean
  number?: number
  infor?: UserInforType
  dreamTeam?: boolean
}

export const ItemLeaderBoard = ({
  master,
  tabLeaderBoard,
  number,
  infor,
  dreamTeam,
}: ItemLeaderBoardProps) => {
  const [inforStar, setInforStar] = React.useState<boolean>(false)

  const handleMouseOver = () => {}
  const handleMouseLeave = () => {}

  return (
    <>
      {/* {inforStar ? (
        <div className="w-[231px] h-[92px] bg-red-600">ss</div>
      ) : null} */}
      <div className="mx-auto">
        <div
          className={`${clsx(
            master ? 'h-[54px] md:h-[68px]' : 'h-[68px]'
          )} relative w-full`}
        >
          <img
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            src={infor && infor.faceImage}
            alt=""
            className={`${clsx(
              master
                ? 'w-[54px] md:w-[68px] h-[54px] md:h-[68px]'
                : 'w-[68px] h-[68px]'
            )} absolute top-0 ${
              tabLeaderBoard ? 'rounded-[8px]' : 'rounded-full'
            } object-cover`}
          />

          {tabLeaderBoard ? (
            <div
              className={`bg-[#09E099] text-[#1E1F24] w-[40px] h-[40px] absolute left-[-18px] 
              bottom-[48px] rounded-[8px] text-[24px] font-bold text-center
              `}
            >
              {number && number === 1 && <span className="">1</span>}
              {number && number === 2 && <span className="">2</span>}
              {number && number === 3 && <span className="">3</span>}
            </div>
          ) : (
            <div
              className={`w-[24px] md:w-[32px] h-[24px] md:h-[32px] absolute left-[-6px] 
              bottom-[8px] md:bottom-[-6px] rounded-full text-[20px] md:text-[24px] font-bold
              `}
            >
              {number && number === 1 && (
                <span className="ml-[5px] md:ml-[9px] mb-[4px] md:mb-[2px]">
                  1
                </span>
              )}
              {number && number === 2 && (
                <span className="ml-[5px] md:ml-[9px] mb-[4px] md:mb-[2px]">
                  2
                </span>
              )}
              {number && number === 3 && (
                <span className="ml-[5px] md:ml-[9px] mb-[4px] md:mb-[2px]">
                  3
                </span>
              )}
            </div>
          )}
        </div>

        <div className={`${master ? 'mt-[12px]' : 'mt-[5px]'} text-center`}>
          <p
            className={`${
              master ? 'text-[14px] md:text-[18px]' : 'text-[14px]'
            }`}
          >
            {infor && infor.fullName}
          </p>
          <p className="text-[10px] md:text-[12px] text-[#A2A5AD]">
            {infor && infor.clubName}
          </p>
        </div>
      </div>
    </>
  )
}
