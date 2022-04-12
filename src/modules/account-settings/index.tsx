import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { Account } from 'src/modules/account-settings/account/Account'
import { Football } from 'src/modules/account-settings/football/Football'
import { Health } from 'src/modules/account-settings/health/Health'
import { Media } from 'src/modules/account-settings/media/Media'
import { Profile } from 'src/modules/account-settings/profile/Profiile'
import { Settings } from 'src/modules/account-settings/settings/Settings'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

const tabs = [
  { label: 'Account', value: 'account' },
  { label: 'Settings', value: 'settings' },
  { label: 'Profile', value: 'profile' },
  { label: 'Media', value: 'media' },
  { label: 'Health', value: 'health' },
  { label: 'Football', value: 'football' },
]

export const AccountSettings = () => {
  const [, setSettings] = useAtom(settingsAtom)
  const { currentRoleName } = useAuth()
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
  )
}
