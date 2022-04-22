import { Divider, Tab, Tabs } from '@mui/material'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { QueryParamsAtom } from 'src/atoms/QueryParams'
import { Button } from 'src/components/Button'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { TeamType } from 'src/constants/types/settingsType.type'
import {
  cancelRequestJoinTeam,
  requestToJoinTeam,
} from 'src/service/contacts/team.service'
import { safeHttpImage } from 'src/utils/utils'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import FloatingButton from '../components/modals/FloatingButton'
import EditAdmins from './actions/EditAdminsModal'
import DeleteTeam from './actions/DeleteTeam'
import EditMembers from './actions/EditMembersModal'
import EditTeamModal from './actions/EditTeamModal'
import LeaveTeam from './actions/LeaveTeam'
import TeamMembers from './components/TeamMembers'
import EditOwners from './actions/EditOwnersModal'

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
    value: 'team',
    label: 'Edit Team',
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
    label: 'Delete Team',
  },
  {
    value: 'leave',
    label: 'Leave Team',
  },
]

type TeamProfileProps = {
  team?: TeamType
}

const TeamProfile = ({ team }: TeamProfileProps) => {
  const router = useRouter()
  const { teamId } = router.query
  const queryClient = useQueryClient()
  const [_, setQuery] = useAtom(QueryParamsAtom)
  const [currentModal, setCurrentModal] = useState<string>('')
  const [currentTab, setCurrentTab] = useQueryParam(
    'g',
    withDefault(StringParam, 'members')
  )

  useEffect(() => {
    setQuery(currentTab)
  }, [currentTab])

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  const { mutate: mutateRequest, isLoading: isRequesting } = useMutation(
    requestToJoinTeam,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_TEAM_PROFILE)
        toast.success('Send join request successfully')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const { mutate: mutateCancel, isLoading: isCanceling } = useMutation(
    cancelRequestJoinTeam,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_TEAM_PROFILE)
        toast.success('Cancel join request successfully')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const handleSubmit = () => {
    if (REQUEST_STATUS.value === 'join') {
      mutateRequest(teamId)
    }
    if (REQUEST_STATUS.value === 'cancel') {
      mutateCancel(teamId)
    }
  }

  const REQUEST_STATUS = useMemo(() => {
    if (team.memberType === 'NOT_A_MEMBER') {
      return { label: 'Ask to join', value: 'join', style: 'bg-[#4654EA]' }
    }
    if (team.memberType === 'PENDING') {
      return {
        label: 'Cancel join request',
        value: 'cancel',
        style: 'text-black bg-gray-300',
      }
    }
    if (team.memberType === 'MEMBER') {
      return {
        label: 'Joined',
        value: '',
        style: 'text-[#4654EA] border-2 border-[#4654EA]',
      }
    }
  }, [team.memberType])

  const ROLE_RIGHTS = useMemo(() => {
    return ['OWNER', 'ADMIN'].includes(team.memberType)
  }, [team.memberType])

  const ROLE_TABS = useMemo(() => {
    if (['MEMBER', 'PENDING', 'NOT_A_MEMBER'].includes(team.memberType)) {
      return tabs.filter((tab) => !['blocked', 'requested'].includes(tab.value))
    }
    return tabs
  }, [team.memberType])

  const ROLE_FLOAT_BUTTON = useMemo(() => {
    if (['NOT_A_MEMBER', 'PENDING'].includes(team.memberType)) return false
    return true
  }, [team.memberType])

  const ROLE_OPTION = useMemo(() => {
    if (team.memberType === 'MEMBER') {
      return OPTIONS.filter((option) => option.value === 'leave')
    } else if (team.memberType === 'ADMIN') {
      return OPTIONS.filter(
        (option) => !['delete', 'owner'].includes(option.value)
      )
    } else return OPTIONS
  }, [JSON.stringify(team)])

  return (
    <Fragment>
      <div className="relative">
        <img
          className="w-full h-[400px] object-cover object-center"
          src={team.teamImage ? safeHttpImage(team.teamImage) : '/favicon.png'}
        />
        <div className="absolute bottom-0 h-[160px] w-full bg-gradient-to-t from-[#000000]"></div>
        <div className="absolute py-9 px-12 bottom-0 w-full flex justify-between">
          <p className="text-[36px] font-bold">{team.teamName}</p>
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
              <Button
                className="text-[#09E099] h-[50px] border-2 border-[#09E099] w-[220px] rounded-lg"
                type="button"
                label="Follow"
              />
            </div>
          )}
        </div>
      </div>
      <Fragment>
        {currentModal === 'owner' && <EditOwners isClose={setCurrentModal} />}
        {currentModal === 'admin' && <EditAdmins isClose={setCurrentModal} />}
        {currentModal === 'member' && <EditMembers isClose={setCurrentModal} />}
        {currentModal === 'delete' && <DeleteTeam isClose={setCurrentModal} />}
        {currentModal === 'leave' && <LeaveTeam isClose={setCurrentModal} />}
        {currentModal === 'team' && (
          <EditTeamModal initialValue={team} isClose={setCurrentModal} />
        )}
        {ROLE_FLOAT_BUTTON && (
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
        )}
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
          <TeamMembers
            tab="MEMBER"
            countLabel="Member"
            queryKey={QUERIES_CONTACTS.CONTACT_TEAM_MEMBER}
            owner={ROLE_RIGHTS}
          />
        )}
        {currentTab === 'admins' && (
          <TeamMembers
            tab="ADMIN"
            countLabel="Admin"
            queryKey={QUERIES_CONTACTS.CONTACT_TEAM_ADMIN}
            owner={ROLE_RIGHTS}
          />
        )}
        {currentTab === 'owners' && (
          <TeamMembers
            tab="OWNER"
            countLabel="Owner"
            queryKey={QUERIES_CONTACTS.CONTACT_TEAM_OWNER}
            owner={ROLE_RIGHTS}
          />
        )}
        {currentTab === 'blocked' && (
          <TeamMembers
            tab="BLOCK"
            countLabel="Blocked member"
            queryKey={QUERIES_CONTACTS.CONTACT_TEAM_BLOCKED}
            owner={ROLE_RIGHTS}
          />
        )}
        {currentTab === 'requested' && (
          <TeamMembers
            tab="REQUEST"
            countLabel="Requested member"
            queryKey={QUERIES_CONTACTS.CONTACT_TEAM_REQUESTED}
            owner={ROLE_RIGHTS}
          />
        )}
      </div>
    </Fragment>
  )
}

export default TeamProfile
