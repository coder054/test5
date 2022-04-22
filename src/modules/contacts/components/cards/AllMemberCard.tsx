import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { ChervonRightIcon } from 'src/components/icons'
import { MemberType } from 'src/constants/types/member.types'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import Card from '../../components/card-template'

type AllMemberCardProps = {
  member: MemberType
}

export const AllMemberCard = ({ member }: AllMemberCardProps) => {
  const router = useRouter()

  const { currentRoleName } = useAuth()

  return (
    <Fragment>
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
    </Fragment>
  )
}
