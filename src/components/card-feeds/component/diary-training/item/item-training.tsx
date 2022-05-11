import { ChartCircle } from 'src/components/chart-circle'
import { CardFeedType } from 'src/constants/types/feed/yours'
import dayjs from 'dayjs'
import { useState } from 'react'
import { PerformaneStrain } from '../../performance-strain'

interface ItemTrainingProps {
  card: CardFeedType
}

export const ItemTraining = ({ card }: ItemTrainingProps) => {
  const [arrayColor, setArrayColor] = useState<string[]>([])
  const handleTimeOfPractice = (time: number): string => {
    return `${Math.floor(time / 1)}h ${(time - Math.floor(time / 1)) * 6}min`
  }
  const handleTimeOfItemPractice = (time: number): string => {
    let result = ''
    if (time >= 60) {
      result += `${Math.floor(time / 60)}h `
      time = time - Math.floor(time / 60) * 60
    }
    result += `${time}m`

    return result
  }
  // console.log('Object.values', Object.values(card?.trainingCategory)[0])

  return (
    <div className="cursor-pointer">
      <div className="relative h-[60px]">
        <div className="absolute left-0 -bottom-[48px]">
          <div className="w-[84px] float-left -ml-[24px]">
            <ChartCircle
              index={0}
              type={'feed'}
              ArrayColor={[['#4654EA', '#09E099', '#07E1FF', '#E85CFF']]}
              ArrayLabel={Object.keys(card?.trainingCategory)}
              ArrayPercent={Object.values(card?.trainingCategory)}
            />
          </div>
          <div className="float-left w-[140px] h-full ml-[24px]">
            <p className="mt-[40px]">Team Training</p>
            <p className="text-[#A2A5AD] text-[12px] mt-[2px]">
              {dayjs(card?.createdAt).format('YYYY/MM/DD')}
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-[14px]">
          <div className="w-full flex flex-row-reverse">
            <div className="min-w-[72px] h-[38px] rounded-[8px] bg-[#13161A] mr-[20px]">
              <p className="text-[#A2A5AD] text-[14px] p-[8px]">
                {handleTimeOfPractice(card?.training?.hoursOfPractice)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[48px] flex mt-[28px]">
        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left text-[14px]">
            <p className="text-[#E85CFF]">Physical</p>
            <p>{handleTimeOfItemPractice(card?.training?.physics)}</p>
          </div>
          <div className="h-[24px] w-[1px] bg-[#252627] float-left mt-[8px]"></div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left text-[14px]">
            <p className="text-[#4654EA]">Technical</p>
            <p>{handleTimeOfItemPractice(card?.training?.technics)}</p>
          </div>
          <div className="h-[24px] w-[1px] bg-[#252627] float-left mt-[8px]"></div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left text-[14px]">
            <p className="text-[#07E1FF]">Mental</p>
            <p>{handleTimeOfItemPractice(card?.training?.mental)}</p>
          </div>
          <div className="h-[24px] w-[1px] bg-[#252627] float-left mt-[8px]"></div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left text-[14px]">
            <p className="text-[#09E099]">Tactical</p>
            <p>{handleTimeOfItemPractice(card?.training?.tactics)}</p>
          </div>
        </div>
      </div>

      {/* <div className="w-full mt-[16px] flex gap-4 pl-[4px] pr-[4px]">
        {(card?.training?.practiceTags || []).map((tag) => (
          <p className="bg-[#64748B] rounded-[16px] h-[30px] pt-[4px] pb-[4px] pl-[12px] pr-[12px] text-[14px]">
            {tag}
          </p>
        ))}
      </div> */}

      <PerformaneStrain
        performance={card?.match}
        playerPerformance={card?.training?.yourPerformance}
        teamPerformance={card?.training?.teamPerformance}
        yourPhysicallyStrain={card?.training?.yourPhysicallyStrain}
        teamPhysicallyStrain={card?.training?.teamPhysicallyStrain}
      />
    </div>
  )
}
