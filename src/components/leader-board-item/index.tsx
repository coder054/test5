import Image from 'next/image'
import { UserInforType } from 'src/constants/types'
import clsx from 'clsx'

interface ItemLeaderBoardProps {
  master?: boolean
  number?: number
  infor?: UserInforType
}

export const ItemLeaderBoard = ({
  master,
  number,
  infor,
}: ItemLeaderBoardProps) => {
  const classNumber = clsx(
    number === 1 && 'bg-[#4654EA]',
    number === 2 && 'bg-[#09E099]',
    number === 3 && 'bg-[#07E1FF]'
  )

  return (
    <div className="max-auto">
      <div className="relative w-full h-[68px]">
        <img
          src={infor && infor.faceImage}
          alt=""
          className="absolute top-0 w-[68px] h-[68px] rounded-full object-cover"
        />
        <div
          className={`${classNumber} w-[32px] h-[32px] absolute left-[-6px] bottom-[-6px] rounded-full 
            text-[24px] font-bold`}
        >
          {number && number === 1 && (
            <span className="ml-[9px] mb-[2px]">1</span>
          )}
          {number && number === 2 && (
            <span className="ml-[9px] mb-[2px]">2</span>
          )}
          {number && number === 3 && (
            <span className="ml-[9px] mb-[2px]">3</span>
          )}
        </div>
      </div>
      <div className={`${master ? 'mt-[12px]' : 'mt-[5px]'} text-center`}>
        <p className={`${master ? 'text-[18px]' : 'text-[14px]'}`}>
          {infor && infor.fullName}
        </p>
        <p className="text-[12px] text-[#A2A5AD]">{infor && infor.clubName}</p>
      </div>
    </div>
  )
}
