import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { ChervonRightIcon } from 'src/components/icons'
import { MemberType } from 'src/constants/types/member.types'
import { getBioUrl } from 'src/utils/utils'
import Card from '../../components/card-template'

type AllMemberCardProps = {
  member: MemberType
}

export const AllMemberCard = ({ member }: AllMemberCardProps) => {
  const router = useRouter()

  return (
    <Fragment>
      <Card
        name={member.fullName}
        avatar={member.faceImage}
        users={[member.username]}
        roles={member.favoriteRoles}
        city={member.city}
        club={member.clubName}
        onClick={() =>
          router.push(getBioUrl(member.type, member.username, member.fullName))
        }
        commonOptions={
          <button type="button">
            <ChervonRightIcon className="w-[25px] h-[25px] active:scale-125 duration-150" />
          </button>
        }
      />
    </Fragment>
  )
}
