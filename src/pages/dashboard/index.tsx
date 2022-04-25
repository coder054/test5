import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { Development } from 'src/modules/dashboard/development-dashboard'
import { Health } from 'src/modules/dashboard/health'
import { LeaderBoards } from 'src/modules/dashboard/leader-board'
// import { Development } from 'src/module/dashboard/development'
// import { Health } from 'src/module/dashboard/health'
// import { LeaderBoards } from 'src/module/dashboard/leader-board'
// import { Pain } from 'src/module/dashboard/pain'
import DashboardMatches from 'src/modules/dashboard/matches'
import { Overview } from 'src/modules/dashboard/overview'
import { Pain } from 'src/modules/dashboard/pain'
import DashBoardTraining from 'src/modules/dashboard/training'
import DashboardWellness from 'src/modules/dashboard/wellness'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Training', value: 'training' },
  { label: 'Matches', value: 'matches' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Health', value: 'health' },
  { label: 'Development', value: 'development' },
  { label: 'Pain', value: 'pain' },
  { label: 'Leaderboards', value: 'leaderboards' },
]

const Dashboard: NextPage = () => {
  const [currentTab, setCurrentTab] = useQueryParam(
    'd',
    withDefault(StringParam, 'overview')
  )

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <div className="laptopM:px-12 mobileM:px-4">
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
      {currentTab === 'overview' && <Overview setCurrentTab={setCurrentTab} />}
      {currentTab === 'training' && <DashBoardTraining />}
      {currentTab === 'matches' && <DashboardMatches />}
      {currentTab === 'wellness' && <DashboardWellness />}
      {currentTab === 'health' && <Health />}
      {currentTab === 'development' && <Development />}
      {currentTab === 'pain' && <Pain />}
      {currentTab === 'leaderboards' && <LeaderBoards />}
    </div>
  )
}

Dashboard.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}

export default Dashboard
