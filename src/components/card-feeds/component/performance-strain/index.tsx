import Rating from '@mui/material/Rating'
import { MatchType } from 'src/constants/types/feed/yours'
import {
  emotionToNum,
  emotionlToStar,
  scaleToColorStrain,
  emotionToNumStrain,
} from 'src/hooks/functionCommon'

interface PerformaneStrainProps {
  performance?: MatchType
  playerPerformance?: string
  teamPerformance?: string
  yourPhysicallyStrain?: string
  teamPhysicallyStrain?: string
}

export const PerformaneStrain = ({
  performance,
  teamPerformance,
  playerPerformance,
  teamPhysicallyStrain,
  yourPhysicallyStrain,
}: PerformaneStrainProps) => {
  // console.log('yourPhysicallyStrain:', yourPhysicallyStrain)

  return (
    <div className="w-full flex text-[14px] mt-[8px]">
      <div className="flex-1 flex-col">
        <p className="ml-[24px]">Performance</p>
        <div className="w-full mt-[4px]">
          <span className="float-left mt-[4px] mr-[16px] text-[#A2A5AD]">
            You
          </span>
          <div className="">
            <Rating
              name="read-only"
              value={emotionlToStar(playerPerformance)}
              readOnly
            />
          </div>
        </div>
        <div className="w-full mt-[4px]">
          <span className="float-left mt-[4px] mr-[4px] text-[#A2A5AD]">
            Team
          </span>
          <div className="">
            <Rating
              name="read-only"
              value={emotionlToStar(teamPerformance)}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="flex-1 ">
        <p className="ml-[24px]">Strain</p>

        <div className="w-full mt-[12px]">
          <div
            className={`${scaleToColorStrain(yourPhysicallyStrain)} ${
              emotionToNumStrain(yourPhysicallyStrain)
                ? 'border border-[#A2A5AD]'
                : ''
            }`}
            style={{
              height: 10,
              width: emotionToNumStrain(yourPhysicallyStrain) || 0,
            }}
          ></div>
        </div>

        <div className="w-full mt-[24px]">
          <div
            className={`${scaleToColorStrain(teamPhysicallyStrain)} ${
              emotionToNumStrain(teamPhysicallyStrain)
                ? 'border border-[#A2A5AD]'
                : ''
            }`}
            style={{
              height: 10,
              width: emotionToNumStrain(teamPhysicallyStrain) || 0,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
