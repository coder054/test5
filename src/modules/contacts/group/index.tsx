import { Divider, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { GroupType } from 'src/constants/types/contacts.types'
import { safeHttpImage } from 'src/utils/utils'
import TeamAdmin from './tabs/TeamAdmin'
import TeamMember from './tabs/TeamMember'
import TeamOwner from './tabs/TeamOwner'

const tabs = [
  { label: 'Members', value: 'members' },
  { label: 'Admins', value: 'admins' },
  { label: 'Owners', value: 'owners' },
]

type GroupProfileProps = {
  group?: GroupType
}

const GroupProfile = ({ group }: GroupProfileProps) => {
  const [currentTab, setCurrentTab] = useState<string>('members')

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  return (
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
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider sx={{ mb: 3, borderBottomWidth: 0 }} />
      {currentTab === 'members' && <TeamMember />}
      {currentTab === 'admins' && <TeamAdmin />}
      {currentTab === 'owners' && <TeamOwner />}
    </div>
  )
}

export default GroupProfile
