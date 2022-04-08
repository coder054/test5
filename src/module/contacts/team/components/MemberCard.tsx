import { isDesktop } from 'react-device-detect'
import { ChervonRightIcon } from 'src/components/icons'
import { MemberType } from 'src/constants/types/member.types'
import { safeHttpImage } from 'src/utils/utils'

type MemberCardProps = {
  member: MemberType
}

export const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <div className="flex w-full items-center justify-between bg-[#202128cc] p-4 rounded-lg my-2 cursor-pointer">
      <div className="flex items-center space-x-5">
        <img
          className="w-[65px] h-[65px] rounded-full object-cover object-center"
          src={safeHttpImage(member.faceImage)}
        />
        <div className="flex flex-col space-y-2">
          <p className="font-medium text-[18px]">
            {member.firstName + member.lastName}
          </p>
          <p className="text-[#A2A5AD] text-[16px]">#{member.username}</p>
        </div>
      </div>
      {isDesktop && (
        <div className="flex space-x-24 justify-between text-[18px] font-normal">
          <p>{member.favoriteRoles.map((role) => role).join(', ')}</p>
          <p>{member.city}</p>
          <p>{member.clubName}</p>
        </div>
      )}
      <div>
        <ChervonRightIcon />
      </div>
    </div>
  )
}
