import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { Account } from 'src/module/account-settings/account/Account'
import { Football } from 'src/module/account-settings/football/Football'
import { Health } from 'src/module/account-settings/health/Health'
import { Media } from 'src/module/account-settings/media/Media'
import { Profile } from 'src/module/account-settings/profile/Profiile'
import { Settings } from 'src/module/account-settings/settings/Settings'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const tabs = [
  { label: 'Account', value: 'account' },
  { label: 'Settings', value: 'settings' },
  { label: 'Profile', value: 'profile' },
  { label: 'Media', value: 'media' },
  { label: 'Health', value: 'health' },
  { label: 'Football', value: 'football' },
]

const AccountPage: NextPage = () => {
  const [, setSettings] = useAtom(settingsAtom)
  const { currentRoleName } = useAuth()
  // const [currentTab, setCurrentTab] = useState<string>('account')
  const [currentTab, setCurrentTab] = useQueryParam(
    'type',
    withDefault(StringParam, 'account')
  )
  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  const getSettings = async () => {
    const res = await axios.get(`users/${currentRoleName.toString()}-profile`)
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
          {currentTab === 'account' && <Account getSettings={getSettings} />}
          {currentTab === 'settings' && <Settings />}
          {currentTab === 'profile' && <Profile getSettings={getSettings} />}
          {currentTab === 'media' && <Media />}
          {currentTab === 'health' && <Health />}
          {currentTab === 'football' && <Football />}
        </Container>
      </Box>
    </>
  )
}

AccountPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default AccountPage
