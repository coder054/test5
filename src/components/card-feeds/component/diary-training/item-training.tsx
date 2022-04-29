import { ChartCircle } from 'src/components/chart-circle'
import { CardFeedType } from 'src/constants/types/feed/yours'
import dayjs from 'dayjs'

interface ItemTrainingProps {
  card: CardFeedType
}

export const ItemTraining = ({ card }: ItemTrainingProps) => {
  return (
    <div className="cursor-pointer">
      <div className="relative h-[60px]">
        <div className="absolute left-0 -bottom-[60px]">
          <div className="w-[84px] float-left">
            <ChartCircle
              index={0}
              type={'feed'}
              ArrayColor={['#E85CFF', '#4654EA', '#07E1FF', '#09E099']}
              ArrayLabel={Object.keys(card?.trainingCategory)}
              ArrayPercent={Object.values(card?.trainingCategory)}
            />
          </div>
          <div className="float-left w-[140px] h-full">
            <p className="mt-[40px]">Team Training</p>
            <p className="text-[#A2A5AD] text-[12px] mt-[2px]">
              {dayjs(card?.createdAt).format('YYYY/MM/DD')}
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-[14px]">
          <div className="w-full flex flex-row-reverse">
            <div className="w-[80px] h-[38px] rounded-[8px] bg-[#13161A] mr-[20px]">
              <p className="text-[#A2A5AD] text-[14px] p-[8px]">1h 45min</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[48px] flex mt-[24px]">
        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left">
            <p className="text-[#E85CFF]">Physical</p>
            <p>{card?.trainingCategory?.physical}</p>
          </div>
          <div className="h-[24px] w-[1px] bg-[#252627] float-left mt-[12px]"></div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left">
            <p className="text-[#4654EA]">Technical</p>
            <p>{card?.trainingCategory?.technical}</p>
          </div>
          <div className="h-[24px] w-[1px] bg-[#252627] float-left mt-[12px]"></div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left">
            <p className="text-[#07E1FF]">Mental</p>
            <p>{card?.trainingCategory?.mental}</p>
          </div>
          <div className="h-[24px] w-[1px] bg-[#252627] float-left mt-[12px]"></div>
        </div>

        <div className="flex-1 text-center">
          <div className="w-[calc(100%-1px)] float-left">
            <p className="text-[#09E099]">Tactical</p>
            <p>{card?.trainingCategory?.tactics}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
