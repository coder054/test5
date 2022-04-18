import clsx from 'clsx'
import { useRouter } from 'next/router'
import { isDesktop } from 'react-device-detect'
import { ChervonRightIcon } from 'src/components/icons'
import { CARD } from 'src/constants/mocks/class.constants'
import { MemberType } from 'src/constants/types/member.types'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { safeHttpImage } from 'src/utils/utils'

type MemberCardProps = {
  member: MemberType
}

export const MemberCard = ({ member }: MemberCardProps) => {
  const router = useRouter()
  const { currentRoleName } = useAuth()
  return (
    <button
      onClick={() =>
        router.push(
          `/${currentRoleName.toLowerCase()}/${member.username}/${
            member.fullName
          }`
        )
      }
      type="button"
      className={clsx(CARD.CARD)}
    >
      <div className="grid grid-cols-12 gap-x-">
        <div className="flex space-x-4 col-span-3">
          <img
            className={clsx(CARD.CARD_AVATAR, 'rounded-full')}
            src={
              member.faceImage
                ? safeHttpImage(member.faceImage)
                : '/favicon.png'
            }
          />
          <div className="flex flex-col justify-center space-y-2">
            <p className=" font-semibold text-[18px]">{member.fullName}</p>
            <p className="text-[#A2A5AD] font-normal text-[12px] laptopM:text-[14px]">
              #{member.username}
            </p>
          </div>
        </div>
        <div className="w-full col-span-7 grid items-center grid-cols-3 gap-x-0">
          <p className="w-[120px] truncate">
            {(member.favoriteRoles || []).map((it) => it).join(', ')}
          </p>
          <p className="w-[120px] truncate">{member?.city}</p>
          <p className="w-[120px] truncate">{member?.clubName}</p>
        </div>
        <div className="col-span-2 text-right flex items-center">as</div>
      </div>
    </button>
  )
}
