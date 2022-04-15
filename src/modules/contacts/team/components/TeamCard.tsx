import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ChervonRightIcon } from 'src/components/icons'
import { CARD } from 'src/constants/mocks/class.constants'
import { TeamsType } from 'src/constants/types/contacts.types'
import { safeHttpImage } from 'src/utils/utils'

type TeamsCardProps = {
  team?: TeamsType
}

export const TeamsCard = ({ team }: TeamsCardProps) => {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.push(`/contacts/team/${team.teamId}`)}
      className={clsx(CARD.CARD)}
    >
      <div className="flex justify-between items-center space-x-4">
        <div className="flex space-x-4">
          <img
            className={clsx(CARD.CARD_AVATAR, 'rounded-lg')}
            src={
              team?.teamImage ? safeHttpImage(team?.teamImage) : '/favicon.png'
            }
          />
          <div className="flex flex-col justify-center space-y-2">
            <p className=" font-semibold text-[18px]">
              {team.clubName} - {team.teamName}
            </p>
            <p className=" text-[#A2A5AD] font-normal text-[12px] laptopM:text-[14px]">
              {team.usernames.map((name) => name).join(', ')}
            </p>
          </div>
        </div>
        <div>
          <ChervonRightIcon />
        </div>
      </div>
    </button>
  )
}
