import { MatchType } from 'src/constants/types/feed/yours'
import { safeHttpImage } from 'src/utils/utils'

interface ResultMatchProps {
  stat: MatchType
}

export const ResultMatch = ({ stat }: ResultMatchProps) => {
  return (
    <div className="w-full ">
      <div className="w-full h-[50px] bg-[#13161A] rounded-[8px] grid grid-cols-7 items-center">
        <div className="col-span-3 flex justify-center">
          <span
            className="pl-[46px] w-[150px] flex flex-row-reverse truncate"
            title={stat?.yourTeam?.clubName}
          >
            {stat?.yourTeam?.clubName}
          </span>
          <img
            src={safeHttpImage(stat?.yourTeam?.clubLogo)}
            className="w-[24px] h-[24px] rounded-full ml-[16px] object-cover"
          ></img>
        </div>
        <div className="col-span-1 flex items-center">
          <div className="w-[48px] h-[32px] bg-[#4654EA] rounded-[6px] mx-auto flex items-center">
            <span className="mx-auto text-[14px] font-semibold">
              {stat?.result?.yourTeam} : {stat?.result?.opponents}
            </span>
          </div>
        </div>
        <div className="col-span-3 flex justify-center">
          <img
            src={safeHttpImage(stat?.opponentClub?.logoUrl)}
            className="w-[24px] h-[24px] rounded-full mr-[16px] object-cover"
          ></img>
          <span
            className="pr-[46px] w-[150px] truncate"
            title={stat?.opponentClub?.clubName}
          >
            {stat?.opponentClub?.clubName}
          </span>
        </div>
      </div>

      <div className="w-full mt-[8px] flex justify-between text-[#A2A5AD] text-[12px]">
        <span>{stat?.dateTime}</span>
        <span>{stat?.typeOfGame}</span>
      </div>
    </div>
  )
}
