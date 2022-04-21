import { useRouter } from 'next/router'
import { ChervonRightIcon } from 'src/components/icons'
import { MemberType } from 'src/constants/types/member.types'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import Card from '../card-template'

type FanCardProps = {
  member: MemberType
}

export const FanCard = ({ member }: FanCardProps) => {
  const router = useRouter()
  const { currentRoleName } = useAuth()
  return (
    <Card
      name={member.fullName}
      avatar={member.faceImage}
      users={[member.username]}
      roles={member.favoriteRoles}
      city={member.city}
      club={member.clubName}
      commonOptions={
        <button
          type="button"
          onClick={() =>
            router.push(
              `/${currentRoleName.toLowerCase()}/${member.username}/${
                member.fullName
              }`
            )
          }
        >
          <ChervonRightIcon className="w-[25px] h-[25px] active:scale-125 duration-150" />
        </button>
      }
    />
  )
}
