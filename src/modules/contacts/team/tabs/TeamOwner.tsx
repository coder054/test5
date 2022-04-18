import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { SortIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { MemberType } from 'src/constants/types/member.types'
import { fetchTeamMember } from 'src/service/contacts/team.service'
import { Counter } from '../../components/Counter'
import SkeletonContact from '../../components/SkeletonContact'
import { Sort } from '../../components/Sort'
import { MemberCard } from '../components/MemberCard'

const TeamOwner = () => {
  const router = useRouter()
  const { teamId } = router.query
  const [initial, setIninital] = useState({
    count: 0,
    data: [],
  })
  const [sort, setSort] = useState<string>('asc')
  const { isLoading: isGettingOwner, data: responseDisplay } = useQuery(
    [QUERIES_CONTACTS.CONTACT_TEAM_OWNER, teamId],
    () =>
      fetchTeamMember({
        teamId: teamId,
        limit: 100,
        startAfter: '1',
        sort: sort ? 'desc' : 'asc',
        tab: 'OWNER',
      })
  )

  useEffect(() => {
    responseDisplay &&
      setIninital((prev) => ({
        ...prev,
        count: responseDisplay.data.count,
        data: responseDisplay.data.data,
      }))
  }, [JSON.stringify(responseDisplay)])

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-3 items-center">
          <Counter
            count={initial.count}
            label="Owner"
            isLoading={isGettingOwner}
          />
        </div>
        <Sort value={sort} onChange={(value) => setSort(value)} />
      </div>
      {isGettingOwner ? (
        <SkeletonContact />
      ) : (
        <>
          {initial.data.map((it: MemberType) => (
            <MemberCard member={it} key={it.userId} />
          ))}
        </>
      )}
    </div>
  )
}
export default TeamOwner
