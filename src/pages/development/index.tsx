import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { Development } from 'src/modules/development/development-item'
import { FutureCareer } from 'src/modules/development/future-career'
import { HeightAndWeight } from 'src/modules/development/height-and-weight'
import { Historic } from 'src/modules/development/historic'
import { Skills } from 'src/modules/development/skills'
import { Trophies } from 'src/modules/development/trophies'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const tabs = [
  { label: 'Skills', value: 'skills' },
  { label: 'Development', value: 'development' },
  { label: 'Height & Weight', value: 'heightAndWeight' },
  { label: 'Trophies & Awards', value: 'trophies' },
  { label: 'Future Career', value: 'future' },
  { label: 'Historic Career Data', value: 'historic' },
]

const DevelopmentPage: NextPage = () => {
  const { currentRoleName, currentRoleId } = useAuth()
  const [currentTab, setCurrentTab] = useState<string>('skills')

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  return (
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
          {currentTab === 'skills' && <Skills playerId={currentRoleId} />}
          {currentTab === 'development' && (
            <Development
              playerId={currentRoleId}
              currentRoleName={currentRoleName}
            />
          )}
          {currentTab === 'heightAndWeight' && <HeightAndWeight />}
          {currentTab === 'trophies' && <Trophies />}
          {currentTab === 'future' && <FutureCareer />}
          {currentTab === 'historic' && <Historic />}
        </Container>
      </Box>
    </>
  )
}

DevelopmentPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default DevelopmentPage
