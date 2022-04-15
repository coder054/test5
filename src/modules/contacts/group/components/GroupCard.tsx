import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ChervonRightIcon } from 'src/components/icons'
import { CARD } from 'src/constants/mocks/class.constants'
import { GroupType } from 'src/constants/types/contacts.types'
import { safeHttpImage } from 'src/utils/utils'

type GroupCardProps = {
  group?: GroupType
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.push(`/contacts/group/${group.groupId}`)}
      className={clsx(CARD.CARD)}
    >
      <div className="flex justify-between items-center space-x-4">
        <div className="flex space-x-4">
          <img
            className={clsx(CARD.CARD_AVATAR, 'rounded-lg')}
            src={
              group?.groupImage
                ? safeHttpImage(group?.groupImage)
                : '/favicon.png'
            }
          />
          <div className="flex flex-col justify-center space-y-2">
            <p className=" font-semibold text-[18px]">{group.name}</p>
            <p className=" text-[#A2A5AD] font-normal text-[12px] laptopM:text-[14px]">
              {group.usernames.map((name) => name).join(', ')}
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
