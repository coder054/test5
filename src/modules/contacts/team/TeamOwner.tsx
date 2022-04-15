import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { SortIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { MemberType } from 'src/constants/types/member.types'
import { fetchTeamMember } from 'src/service/contacts/team.service'
import SkeletonContact from '../components/SkeletonContact'
import { MemberCard } from './components/MemberCard'

const TeamOwner = () => {
  const router = useRouter()
  const { teamId } = router.query
  const [initial, setIninital] = useState({
    count: 0,
    data: [],
  })
  const [sort, setSort] = useState<boolean>(false)
  const { isLoading: isGettingAdmin, data: responseDisplay } = useQuery(
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
          <p className="text-[#09E099] font-medium">
            {isGettingAdmin ? (
              <CircularProgress color="primary" size={20} />
            ) : (
              initial.count
            )}
          </p>
          <p className="text-[#A2A5AD] font-normal">
            {initial.count === 1 ? 'Member' : 'Members'}
          </p>
        </div>
        <button onClick={() => setSort(!sort)}>
          <SortIcon />
        </button>
      </div>
      {isGettingAdmin ? (
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
