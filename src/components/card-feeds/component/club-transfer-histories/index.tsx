import { CardFeedType } from 'src/constants/types/feed/yours'
import { SvgTransfer } from 'src/imports/svgs'
import { safeHttpImage } from 'src/utils/utils'

interface ClubTransferHistoriesProps {
  card: CardFeedType
}

export const ClubTransferHistories = ({ card }: ClubTransferHistoriesProps) => {
  return (
    <div className="grid grid-cols-5 w-full pl-[32px] pr-[32px] pb-[12px] ">
      <div className="col-span-2 text-center">
        <p className="text-[14px] text-[#A2A5AD]">From</p>
        <img
          alt=""
          src={safeHttpImage(card?.transferInfo?.oldClub?.clubLogo)}
          className="w-[164px] h-[164px] rounded-full object-cover mx-auto mt-[8px]"
        ></img>
        <p className="text-[16px] mt-[8px]">
          {card?.transferInfo?.oldClub?.clubName}
        </p>
        <div>
          <span className="text-[12px] text-[#A2A5AD] mt-[8px]">
            {card?.transferInfo?.oldClub?.from} -{' '}
            {card?.transferInfo?.oldClub?.to}
          </span>
        </div>
      </div>

      <div className="col-span-1 text-center">
        <p className="text-[18px] font-bold">Transfer</p>
        <p className="text-[24px] text-[#09E099] font-bold">
          {card?.transferInfo?.transferFee} M€
        </p>
        <div className="mx-auto w-[24px] mt-[36px]">
          <SvgTransfer />
        </div>
      </div>

      <div className="col-span-2 text-center">
        <p className="text-[14px] text-[#A2A5AD]">To</p>
        <img
          alt=""
          src={safeHttpImage(card?.transferInfo?.newClub?.clubLogo)}
          className="w-[164px] h-[164px] rounded-full object-cover mx-auto mt-[8px]"
        ></img>
        <p className="text-[16px] mt-[8px]">
          {card?.transferInfo?.newClub?.clubName}
        </p>
        <div>
          <span className="text-[12px] text-[#A2A5AD] mt-[8px]">
            {card?.transferInfo?.newClub?.from} -{' '}
            {card?.transferInfo?.newClub?.to}
          </span>
        </div>
      </div>
    </div>
  )
}
