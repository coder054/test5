import { useRouter } from 'next/router'
import { ChervonRightIcon } from 'src/components/icons'
import { MemberType } from 'src/constants/types/member.types'
import { getBioUrl } from 'src/utils/utils'
import Card from '../card-template'

type FanCardProps = {
  member: MemberType
}

export const FollowerCard = ({ member }: FanCardProps) => {
  const router = useRouter()
  return (
    <Card
      name={member.fullName}
      avatar={member.faceImage}
      users={[member.username]}
      roles={member.favoriteRoles}
      city={member.city}
      club={member.clubName}
      onClick={() =>
        router.push(
          getBioUrl(
            member.type,
            member.username,
            member.firstName,
            member.lastName
          )
        )
      }
      commonOptions={
        <button type="button">
          <ChervonRightIcon className="w-[25px] h-[25px] active:scale-125 duration-150" />
        </button>
      }
    />
  )
}
