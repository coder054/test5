import { useState } from 'react'
import { LeaderBoardType } from 'src/constants/types'
import { ItemLeaderBoard } from '../leader-board-item'

interface LeaderBoardProps {
  master?: boolean
  tabLeaderBoard?: boolean
  listMasterLeaderBoard?: LeaderBoardType[]
}

export const LeaderBoard = ({
  master,
  tabLeaderBoard,
  listMasterLeaderBoard,
}: LeaderBoardProps) => {
  return (
    <div className="w-full">
      <div className="w-[54px] md:w-[68px] mx-auto mt-[40px]">
        <ItemLeaderBoard
          master
          number={1}
          infor={listMasterLeaderBoard[0]?.userInfo}
          tabLeaderBoard={tabLeaderBoard}
        />
      </div>
      <div
        className={`flex ${
          tabLeaderBoard
            ? 'gap-[32px] xl:gap-[140px] mt-[-62px]'
            : 'gap-[64px] xl:gap-[260px] mt-[-44px]'
        } `}
      >
        <div className="flex-1">
          <div className="w-[54px] md:w-[168px] mx-auto">
            <ItemLeaderBoard
              master
              number={2}
              infor={listMasterLeaderBoard[1]?.userInfo}
              tabLeaderBoard={tabLeaderBoard}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="w-[54px] md:w-[68px] mx-auto">
            <ItemLeaderBoard
              master
              number={3}
              infor={listMasterLeaderBoard[2]?.userInfo}
              tabLeaderBoard={tabLeaderBoard}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
