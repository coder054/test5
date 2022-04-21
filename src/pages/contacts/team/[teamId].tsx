import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Loading } from 'src/components'
import { Button } from 'src/components/Button'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { requireAuth } from 'src/config/firebase-admin'
import {
  QUERIES_CONTACTS,
  QUERIES_DASHBOARD,
} from 'src/constants/query-keys/query-keys.constants'
import { TeamType } from 'src/constants/types/settingsType.type'
import { fetchTeam } from 'src/service/contacts/team.service'
import TeamProfile from 'src/modules/contacts/team'

const Team: NextPage = () => {
  const router = useRouter()
  const { teamId } = router.query

  const [initial, setInitial] = useState<TeamType>({
    clubId: '',
    clubName: '',
    clubUrl: '',
    memberType: '',
    teamId: '',
    teamImage: '',
    teamName: '',
  })

  const { isLoading: isGettingTeam, data: responseDisplay } = useQuery(
    [QUERIES_CONTACTS.CONTACT_TEAM_PROFILE, teamId],
    () => fetchTeam({ teamId: teamId })
  )

  useEffect(() => {
    responseDisplay && setInitial(responseDisplay.data)
  }, [JSON.stringify(responseDisplay)])

  return (
    <Loading isLoading={isGettingTeam} className="w-full">
      <TeamProfile team={initial} />
    </Loading>
  )
}

Team.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default Team
