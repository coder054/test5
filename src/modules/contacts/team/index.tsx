import { Divider, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { TeamType } from 'src/constants/types/settingsType.type'
import { safeHttpImage } from 'src/utils/utils'
import TeamAdmin from './tabs/TeamAdmin'
import TeamOwner from './tabs/TeamOwner'
import TeamMember from './tabs/TeamMember'

const tabs = [
  { label: 'Members', value: 'members' },
  { label: 'Admins', value: 'admins' },
  { label: 'Owners', value: 'owners' },
]

type TeamProfileProps = {
  team?: TeamType
}

const TeamProfile = ({ team }: TeamProfileProps) => {
  const [currentTab, setCurrentTab] = useState<string>('members')

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-[400px]"
          style={{ objectFit: 'cover', objectPosition: '0% 50%' }}
          src={safeHttpImage(team.teamImage)}
          alt="Team Profile"
        />
        <div className="absolute bottom-0 h-[160px] w-full bg-gradient-to-t from-[#000000]"></div>
        <div className="absolute py-9 px-12 bottom-0 w-full flex justify-between">
          <div className="flex space-x-4">
            <img
              src={team.clubUrl}
              className="w-[55px] h-[55px] rounded-full object-cover"
            />
            <p className="text-[36px] font-bold">{team.teamName}</p>
          </div>
          {/* <div className="flex space-x-5">
            <Button
              type="submit"
              className="bg-[#4654EA] w-[185px] h-[50px] rounded-lg"
              label="Ask to join"
            />
            <Button
              type="button"
              labelClass="text-[#09E099]"
              className="border-2 border-[#09E099] w-[185px] h-[50px] rounded-lg"
              label="Folow"
            />
          </div> */}
        </div>
      </div>
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
    </div>
  )
}

export default TeamProfile
