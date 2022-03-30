import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import { Overview } from 'src/module/dashboard/overview'

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
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState<string>('overview')

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <h1 className="text-white">
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 1,
            px: 2,
          }}
        >
          <Container maxWidth="xl">
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
            {currentTab === 'overview' && <Overview />}
          </Container>
        </Box>
      </>
    </h1>
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
