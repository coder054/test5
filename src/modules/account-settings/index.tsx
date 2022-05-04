import { Tab, Tabs } from '@mui/material'
import { useAtom } from 'jotai'
import { Fragment, useEffect } from 'react'
import { useQuery } from 'react-query'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { QUERIES_SETTINGS } from 'src/constants/query-keys/query-keys.constants'
import { Account } from 'src/modules/account-settings/account/Account'
import { FootballPlayer } from 'src/modules/account-settings/football/FootballPlayer'
import { Health } from 'src/modules/account-settings/health/Health'
import { Media } from 'src/modules/account-settings/media/Media'
import { Profile } from 'src/modules/account-settings/profile/Profiile'
import { Settings } from 'src/modules/account-settings/settings/Settings'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { fetchSettings } from 'src/service/diary-update'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import FootballCoach from './football/FootballCoach'

const tabs = [
  { label: 'Account', value: 'account' },
  { label: 'Settings', value: 'settings' },
  { label: 'Profile', value: 'profile' },
  { label: 'Media', value: 'media' },
  { label: 'Health', value: 'health' },
  { label: 'Football', value: 'football' },
]

export const AccountSettings = () => {
  const { currentRoleName } = useAuth()
  const [, setSettings] = useAtom(settingsAtom)
  const [currentTab, setCurrentTab] = useQueryParam(
    'type',
    withDefault(StringParam, 'account')
  )

  const { data } = useQuery([QUERIES_SETTINGS.SETTINGS], () =>
    fetchSettings(currentRoleName)
  )

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  useEffect(() => {
    data && setSettings(data)
  }, [JSON.stringify(data)])

  return (
    <div className="flex flex-col justify-center mb-8 mobileM:mx-4 laptopM:mx-auto">
      <div className="flex justify-start mb-4">
        <Tabs
          value={currentTab}
          onChange={handleTabsChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="secondary"
          sx={{ mt: 3 }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </div>
      {currentTab === 'account' && <Account />}
      {currentTab === 'settings' && <Settings />}
      {currentTab === 'profile' && <Profile />}
      {currentTab === 'media' && <Media />}
      {currentTab === 'health' && <Health />}
      {currentTab === 'football' && (
        <Fragment>
          {currentRoleName === 'PLAYER' && <FootballPlayer />}
          {currentRoleName === 'COACH' && <FootballCoach />}
        </Fragment>
      )}
    </div>
  )
}
