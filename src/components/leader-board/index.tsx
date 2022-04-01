import { useState } from 'react'
import { LeaderBoardType } from 'src/constants/types'
import { ItemLeaderBoard } from '../leader-board-item'

interface LeaderBoardProps {
  master?: boolean
  listMasterLeaderBoard?: LeaderBoardType[]
}

export const LeaderBoard = ({
  master,
  listMasterLeaderBoard,
}: LeaderBoardProps) => {
  return (
    <div className="w-full">
      <div className="w-[68px] mx-auto mt-[40px]">
        <ItemLeaderBoard
          master
          number={1}
          infor={listMasterLeaderBoard[0]?.userInfo}
        />
      </div>
      <div className="flex mt-[-44px] gap-[260px]">
        <div className="flex-1">
          <div className="w-[68px] mx-auto">
            <ItemLeaderBoard
              master
              number={2}
              infor={listMasterLeaderBoard[1]?.userInfo}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="w-[68px] mx-auto">
            <ItemLeaderBoard
              master
              number={3}
              infor={listMasterLeaderBoard[2]?.userInfo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
