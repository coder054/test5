import clsx from 'clsx'
import { useEffect } from 'react'
import { CloseIcon } from 'src/components/icons'
import { PointsType } from 'src/constants/types/diary.types'
import CancelIcon from '@mui/icons-material/Cancel'

type InjurySpotProps = {
  handleDeleteSpot?: () => void
  isDeletable?: boolean
  spot?: PointsType
  level?: number
  showLevel?: boolean
}

export const InjurySpot = ({
  spot,
  level,
  isDeletable,
  showLevel,
  handleDeleteSpot,
}: InjurySpotProps) => {
  return (
    <div>
      <span
        style={{ top: spot.y, left: spot.x }}
        className={clsx(
          'absolute bg-red-500 rounded-full duration-150',
          level === 25 ? 'w-[18px] h-[18px]' : 'w-[14px] h-[14px]'
        )}
      >
        <span
          onClick={(e) => {
            handleDeleteSpot()
            e.stopPropagation()
          }}
          className={clsx(
            'absolute -top-[50px] -left-[50px] p-4 hover:scale-125 duration-150 z-50',
            !isDeletable && 'hidden'
          )}
        >
          <CancelIcon fontSize="medium" sx={{ color: '#FFFFFF' }} />
        </span>
        {level >= 50 && (
          <span className="absolute w-[26px] h-[26px] rounded-full border-[1px] border-red-500 animate-appear -left-[6px] -top-[6px]"></span>
        )}

        {level >= 75 && (
          <span className="absolute w-[36px] h-[36px] rounded-full border-[1px] border-red-500 animate-appear -left-[11px] -top-[11px]"></span>
        )}
        {level >= 100 && (
          <span className="absolute w-[46px] h-[46px] rounded-full border-[1px] border-red-500 animate-appear -left-[16px] -top-[16px]"></span>
        )}
        {showLevel ? (
          <div className="absolute w-[14px] h-[14px] text-[10px] bg-[#ffffff] rounded-full">
            {level === 100 ? 99 : level}
          </div>
        ) : null}
      </span>
    </div>
  )
}
