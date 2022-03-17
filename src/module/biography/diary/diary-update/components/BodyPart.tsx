import clsx from 'clsx'
import { CloseIcon } from 'src/components/icons'
import { SPOT_KEY } from 'src/constants/types/diary.types'

type BodyPartProps = {
  handleChooseSpot: (e: React.MouseEvent<HTMLDivElement>) => void
  handleDeleteSpot: () => void
  className: string
  spot: {
    x: number
    y: number
    name: string
  }
  part: SPOT_KEY
  level: number
}

export const BodyPart = ({
  level,
  part,
  spot,
  className,
  handleDeleteSpot,
  handleChooseSpot,
}: BodyPartProps) => {
  return (
    <div onClick={handleChooseSpot} className={className}>
      {spot.name === part && (
        <div>
          <span
            className={clsx(
              'absolute bg-[#F12121] rounded-full h-[8px] w-[8px] duration-200 z-0'
            )}
            style={{ left: spot.x, top: spot.y }}
          >
            <span
              onClick={(e) => {
                handleDeleteSpot()
                e.stopPropagation()
              }}
              className={clsx(
                'absolute -top-10 -left-6 scale-125 hover:scale-150 active:scale-125 duration-150 z-50',
                part === 'FLA' && 'rotate-[18deg]',
                part === 'FRA' && '-rotate-[18deg]'
              )}
            >
              <CloseIcon />
            </span>
            {level >= 50 && (
              <span className="absolute -top-[4px] -left-[4px] w-[16px] h-[16px] rounded-full border-[1.5px] border-[#F12121]"></span>
            )}
            {level >= 75 && (
              <span className="absolute -top-[9px] -left-[9px] opacity-70 w-[26px] h-[26px] rounded-full border-[1.5px] border-[#F12121]"></span>
            )}
            {level >= 100 && (
              <span className="absolute -top-[14px] -left-[14px] opacity-50 w-[36px] h-[36px] rounded-full border-[1.5px] border-[#F12121]"></span>
            )}
            {level >= 100 && (
              <span className="absolute -top-[14px] -left-[14px] bg-[#F12121] opacity-20 w-[26px] h-[26px] rounded-full"></span>
            )}
          </span>
        </div>
      )}
    </div>
  )
}
