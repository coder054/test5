import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import { ChangeEvent, useEffect, useState } from 'react'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { Account } from 'src/module/account-settings/components/account/Account'
import { Media } from 'src/module/account-settings/components/media/Media'
import { Profile } from 'src/module/account-settings/components/profile/Profiile'
import { Settings } from 'src/module/account-settings/components/settings/Settings'
import { Health } from 'src/module/account-settings/components/health/Health'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { Football } from 'src/module/account-settings/components/football/Football'
import { requireAuth } from 'src/config/firebase-admin'
const tabs = [
  { label: 'Account', value: 'account' },
  { label: 'Settings', value: 'settings' },
  { label: 'Profile', value: 'profile' },
  { label: 'Media', value: 'media' },
  { label: 'Health', value: 'health' },
  // { label: 'Football', value: 'football' },
  // { label: 'Family', value: 'family' },
]

const AccountPage: NextPage = () => {
  const [, setSettings] = useAtom(settingsAtom)
  const { currentRoleName, currentRoleId } = useAuth()
  const [currentTab, setCurrentTab] = useState<string>('account')

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }

  const getSettings = async () => {
    const res = await axios.get(`users/${currentRoleName.toString()}-profile`, {
      headers: {
        roleId: currentRoleId,
      },
    })
    if (res.status === 200) {
      setSettings(res.data)
    }
  }

  useEffect(() => {
    getSettings()
  }, [])

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Tabs
            indicatorColor="secondary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === 'account' && <Account />}
          {currentTab === 'settings' && <Settings />}
          {currentTab === 'profile' && <Profile />}
          {currentTab === 'media' && <Media />}
          {currentTab === 'health' && <Health />}
          {/* {currentTab === 'football' && <Football />} */}
        </Container>
      </Box>
    </>
  )
}

AccountPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default AccountPage
