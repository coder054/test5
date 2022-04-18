import { Tab, Tabs } from '@mui/material'
import { Fragment } from 'react'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { Friends } from 'src/modules/contacts/Friends'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import CreateNew from './components/CreateGroup'
import FetchingTemplate from './components/FetchingTemplate'

const tabs = [
  { label: 'Friends', value: 'friends' },
  { label: 'Teams', value: 'teams' },
  { label: 'Groups', value: 'groups' },
  { label: 'Fans', value: 'fans' },
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
            countLabel="team"
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
            countLabel="group"
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
          countLabel="fan"
          searchLabel="Search fan"
          filterLabel="Filter your Fans"
        />
      )}
    </div>
  )
}

export default Contacts
