import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Loading } from 'src/components'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { requireAuth } from 'src/config/firebase-admin'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { GroupType } from 'src/constants/types/contacts.types'
import GroupProfile from 'src/modules/contacts/group'
import { fetchGroup } from 'src/service/contacts/group.service'

const Group: NextPage = () => {
  const router = useRouter()
  const { groupId } = router.query

  const [initial, setInitial] = useState<GroupType>({
    userImages: [],
    createdBy: '',
    updatedAt: null,
    createdAt: null,
    groupNameAsArray: [],
    groupImage: '',
    name: '',
    isPrivate: undefined,
    groupId: '',
    usernames: [],
    userIds: [],
    memberType: '',
  })

  const { isLoading: isGettingGroup, data: responseDisplay } = useQuery(
    [QUERIES_CONTACTS.CONTACT_GROUP_PROFILE, groupId],
    () => fetchGroup({ groupId: groupId })
  )

  useEffect(() => {
    responseDisplay && setInitial(responseDisplay.data)
  }, [JSON.stringify(responseDisplay)])

  return (
    <Loading isLoading={isGettingGroup} className="w-full">
      <GroupProfile group={initial} />
    </Loading>
  )
}

Group.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default Group
