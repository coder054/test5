import { useRouter } from 'next/router'
import { ChervonRightIcon } from 'src/components/icons'
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
      onClick={() => router.push(`/contacts/${team.teamId}`)}
      className="w-full text-left py-3 px-4 cursor-pointer my-3 bg-[#202128cc] hover:bg-gray-600 duration-150 rounded-lg "
    >
      <div className="flex justify-between items-center space-x-4">
        <div className="flex space-x-4">
          <img
            className="w-[60px] h-[60px] rounded-lg"
            src={team?.teamImage ? safeHttpImage(team?.teamImage) : ''}
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
