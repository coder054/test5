import { Tab, Tabs } from '@mui/material'
import { Fragment } from 'react'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { Friends } from 'src/modules/contacts/Friends'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import FetchingContactAll from './components/fetchs/FetchingContactAll'
import FetchingTemplate from './components/fetchs/FetchingTemplate'
import CreateNew from './components/modals/ModalCreateGroup'

const tabs = [
  { label: 'Friends', value: 'friends' },
  { label: 'Groups', value: 'groups' },
  { label: 'Teams', value: 'teams' },
  { label: 'All', value: 'all' },
  { label: 'Followers', value: 'followers' },
  { label: 'Fans', value: 'fans' },
  { label: 'Teammates', value: 'teammates' },
  { label: 'Blocked', value: 'blocked' },
]

const Contacts = () => {
  const [currentTab, setCurrentTab] = useQueryParam(
    't',
    withDefault(StringParam, 'friends')
  )
  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <div className="px-10 relative">
      <Tabs
        sx={{ mt: 3 }}
        value={currentTab}
        onChange={handleTabsChange}
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      {currentTab === 'friends' && <Friends />}
      {currentTab === 'teams' && (
        <Fragment>
          <FetchingTemplate
            queryKey={QUERIES_CONTACTS.CONTACT_TEAM}
            tab="TEAM"
            countLabel="Team"
            searchLabel="Search team"
            filterLabel="Filter your Teams"
          />
          <CreateNew />
        </Fragment>
      )}
      {currentTab === 'groups' && (
        <Fragment>
          <FetchingTemplate
            queryKey={QUERIES_CONTACTS.CONTACT_GROUP}
            tab="GROUPS"
            countLabel="Group"
            searchLabel="Search group"
            filterLabel="Filter your Groups"
          />
          <CreateNew />
        </Fragment>
      )}
      {currentTab === 'fans' && (
        <FetchingTemplate
          queryKey={QUERIES_CONTACTS.CONTACT_FANS}
          tab="FANS"
          countLabel="Fan"
          searchLabel="Search fan"
          filterLabel="Filter your Fans"
        />
      )}
      {currentTab === 'followers' && (
        <FetchingTemplate
          queryKey={QUERIES_CONTACTS.CONTACT_FOLLOWERS}
          tab="FOLLOWERS"
          countLabel="Follower"
          searchLabel="Search your Followers"
          filterLabel="Filter your Followers"
        />
      )}
      {currentTab === 'teammates' && (
        <FetchingTemplate
          queryKey={QUERIES_CONTACTS.CONTACT_TEAMMATES}
          tab="TEAMMATES"
          countLabel="Teammate"
          searchLabel="Search your Teammates"
          filterLabel="Filter your Teammates"
        />
      )}
      {currentTab === 'blocked' && (
        <FetchingTemplate
          queryKey={QUERIES_CONTACTS.CONTACT_BLOCKED}
          tab="BLOCKED"
          countLabel="Blocked account"
          searchLabel="Search your Teammates"
          filterLabel="Filter your Teammates"
        />
      )}
      {currentTab === 'all' && (
        <FetchingContactAll
          queryKey={QUERIES_CONTACTS.CONTACT_ALL}
          tab="ALL"
          countLabel="Member"
          searchLabel="Search your Members"
          filterLabel="Filter your Members"
        />
      )}
    </div>
  )
}

export default Contacts
