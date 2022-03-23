import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { Account } from 'src/module/account-settings/account/Account'
import { Football } from 'src/module/account-settings/football/Football'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { Development } from 'src/module/development-module/development-item'
import { FutureCareer } from 'src/module/development-module/future-career'
import { HeightAndWeight } from 'src/module/development-module/height-and-weight'
import { Historic } from 'src/module/development-module/historic'
import { Skills } from 'src/module/development-module/skills'
import { Trophies } from 'src/module/development-module/trophies'
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
  // const [playerId, setPlayerId] = useState<string>('')
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
