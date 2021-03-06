import { Divider, Tab, Tabs } from '@mui/material'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { QueryParamsAtom } from 'src/atoms/QueryParams'
import { Button } from 'src/components/Button'
import { ModalMui } from 'src/components/ModalMui'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { GroupType } from 'src/constants/types/contacts.types'
import {
  cancelRequestJoinGroup,
  requestToJoinGroup,
} from 'src/service/contacts/group.service'
import { safeHttpImage } from 'src/utils/utils'
import FloatingButton from '../components/modals/FloatingButton'
import DeleteGroup from './actions/DeleteGroup'
import EditAdmins from './actions/EditAdminsModal'
import EditGroupModal from './actions/EditGroupModal'
import EditMembers from './actions/EditMembersModal'
import EditOwners from './actions/EditOwnersModal'
import LeaveGroup from './actions/LeaveGroup'
import GroupMember from './GroupMember'

const tabs = [
  { label: 'Members', value: 'members' },
  { label: 'Admins', value: 'admins' },
  { label: 'Owners', value: 'owners' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Requested', value: 'requested' },
]

const BUTTON =
  'px-4 py-1.5 hover:bg-gray-400 duration-150 block w-full text-left'

const OPTIONS = [
  {
    value: 'group',
    label: 'Edit group',
  },
  {
    value: 'member',
    label: '- Edit Members',
  },
  {
    value: 'admin',
    label: '- Edit Admins',
  },
  {
    value: 'owner',
    label: '- Edit Owners',
  },
  {
    value: 'delete',
    label: 'Delete Group',
  },
  {
    value: 'leave',
    label: 'Leave Group',
  },
]

type GroupProfileProps = {
  group?: GroupType
}

const GroupProfile = ({ group }: GroupProfileProps) => {
  const router = useRouter()
  const { groupId } = router.query
  const queryClient = useQueryClient()
  const [_, setQuery] = useAtom(QueryParamsAtom)
  const [currentModal, setCurrentModal] = useState<string>('')
  const [isOpenBackground, setIsOpenBackground] = useState<boolean>(false)
  // const [currentTab, setCurrentTab] = useQueryParam(
  //   'g',
  //   withDefault(StringParam, 'members')
  // )

  const [currentTab, setCurrentTab] = useState<string>('members')

  useEffect(() => {
    setQuery(currentTab)
  }, [currentTab])

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  const REQUEST_STATUS = useMemo(() => {
    if (group.memberType === 'NOT_A_MEMBER') {
      return {
        label: 'Ask to join',
        value: 'join',
        style: ' bg-[#4654EA]',
      }
    }
    if (group.memberType === 'PENDING') {
      return {
        label: 'Cancel join request',
        value: 'cancel',
        style: 'text-black bg-gray-300',
      }
    }
    if (group.memberType === 'MEMBER') {
      return {
        label: 'Joined',
        value: '',
        style: 'text-[#4654EA] border-2 border-[#4654EA]',
      }
    }
  }, [group.memberType])

  const { mutate: mutateRequest, isLoading: isRequesting } = useMutation(
    requestToJoinGroup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP_PROFILE)
        toast.success('Send join request successfully')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const { mutate: mutateCancel, isLoading: isCanceling } = useMutation(
    cancelRequestJoinGroup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP_PROFILE)
        toast.success('Cancel join request successfully')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (REQUEST_STATUS.value === 'join') {
      mutateRequest(groupId)
    }
    if (REQUEST_STATUS.value === 'cancel') {
      mutateCancel(groupId)
    }
  }

  const ROLE_RIGHTS = useMemo(() => {
    return ['OWNER', 'ADMIN'].includes(group.memberType)
  }, [group.memberType])

  const ROLE_TABS = useMemo(() => {
    if (['MEMBER'].includes(group.memberType)) {
      return tabs.filter((tab) => !['blocked', 'requested'].includes(tab.value))
    }
    return tabs
  }, [group.memberType])

  const ROLE_OPTION = useMemo(() => {
    if (group.memberType === 'MEMBER') {
      return OPTIONS.filter((option) => option.value === 'leave')
    } else if (group.memberType === 'ADMIN') {
      return OPTIONS.filter(
        (option) => !['delete', 'owner'].includes(option.value)
      )
    } else return OPTIONS
  }, [JSON.stringify(group)])

  return (
    <Fragment>
      <ModalMui
        isOpen={isOpenBackground}
        sx={{
          top: '50%',
          width: '80%',
          height: '80%',
          display: 'flex',
          justifyContent: 'center',
        }}
        onClose={setIsOpenBackground}
      >
        <img
          className="max-w-full h-full items-center"
          src={
            group.groupImage ? safeHttpImage(group.groupImage) : '/favicon.png'
          }
        />
      </ModalMui>
      <button
        type="button"
        onClick={() => setIsOpenBackground(true)}
        className="relative block w-full"
      >
        <img
          className="w-full h-[400px] object-cover object-center"
          src={
            group.groupImage ? safeHttpImage(group.groupImage) : '/favicon.png'
          }
        />
        <div className="absolute bottom-0 h-[160px] w-full bg-gradient-to-t from-[#000000]"></div>
        <div className="absolute py-9 px-12 bottom-0 w-full flex justify-between">
          <p className="text-[36px] font-bold">{group.name}</p>
          {!ROLE_RIGHTS && (
            <div className="space-x-4">
              <Button
                className={clsx(
                  'h-[50px] w-[220px] rounded-lg',
                  REQUEST_STATUS?.style
                )}
                isLoading={isRequesting || isCanceling}
                onClick={handleSubmit}
                type="button"
                label={REQUEST_STATUS?.label}
              />
              {/* <Button
                className="text-[#09E099] h-[50px] border-2 border-[#09E099] w-[220px] rounded-lg"
                type="button"
                label="Follow"
              /> */}
            </div>
          )}
        </div>
      </button>
      <Fragment>
        {currentModal === 'leave' && <LeaveGroup isClose={setCurrentModal} />}
        {currentModal === 'delete' && <DeleteGroup isClose={setCurrentModal} />}
        {currentModal === 'member' && <EditMembers isClose={setCurrentModal} />}
        {currentModal === 'admin' && <EditAdmins isClose={setCurrentModal} />}
        {currentModal === 'owner' && <EditOwners isClose={setCurrentModal} />}
        {currentModal === 'group' && (
          <EditGroupModal initialValue={group} isClose={setCurrentModal} />
        )}
        <FloatingButton>
          <Fragment>
            {ROLE_OPTION.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentModal(option.value)
                }}
                className={clsx(BUTTON)}
              >
                {option.label}
              </button>
            ))}
          </Fragment>
        </FloatingButton>
      </Fragment>
      <div className="p-8">
        <Tabs
          indicatorColor="secondary"
          onChange={handleTabsChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="secondary"
          value={currentTab}
          sx={{ mt: 3 }}
        >
          {ROLE_TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Divider sx={{ mb: 3, borderBottomWidth: 0 }} />
        {currentTab === 'members' && (
          <GroupMember
            tab="MEMBER"
            countLabel="Member"
            queryKey={QUERIES_CONTACTS.CONTACT_GROUP_MEMBER}
            owner={ROLE_RIGHTS}
          />
        )}
        {currentTab === 'admins' && (
          <GroupMember
            tab="ADMIN"
            countLabel="Admin"
            queryKey={QUERIES_CONTACTS.CONTACT_GROUP_ADMIN}
            owner={ROLE_RIGHTS}
          />
        )}
        {currentTab === 'owners' && (
          <GroupMember
            tab="OWNER"
            countLabel="Owner"
            queryKey={QUERIES_CONTACTS.CONTACT_GROUP_OWNER}
            owner={ROLE_RIGHTS}
          />
        )}
        {currentTab === 'blocked' && (
          <GroupMember
            tab="BLOCK"
            countLabel="Blocked member"
            queryKey={QUERIES_CONTACTS.CONTACT_GROUP_BLOCKED}
            owner={ROLE_RIGHTS}
          />
        )}
        {currentTab === 'requested' && (
          <GroupMember
            tab="REQUEST"
            countLabel="Requested member"
            queryKey={QUERIES_CONTACTS.CONTACT_GROUP_REQUESTED}
            owner={ROLE_RIGHTS}
          />
        )}
      </div>
    </Fragment>
  )
}

export default GroupProfile
