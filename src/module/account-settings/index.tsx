import { settingsAtom } from 'src/atoms/accountAndSettings'
import { TabPanel, Tabs } from 'src/components/Tabs'
import { API_GET_USER_ROLES } from 'src/constants/api.constants'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { axios } from 'src/utils/axios'
import { Account } from './components/account/Account'
import { Profile } from './components/profile/Profiile'
import { Settings } from './components/settings/Settings'
import { useAuth } from '../authen/auth/AuthContext'

enum Tab {
  Account = 'Account',
  Settings = 'Settings',
  Profile = 'Profile',
  Media = 'Media',
  Health = 'Health',
  Football = 'Football',
  Family = 'Family',
}

const tabs = [
  { text: Tab.Account },
  { text: Tab.Settings },
  { text: Tab.Profile },
  { text: Tab.Media },
  { text: Tab.Health },
  { text: Tab.Football },
  { text: Tab.Family },
]

export const AccountSettings = () => {
  const { currentRoleName, currentRoleId } = useAuth()
  const [tab, setTab] = useState(Tab.Account)
  const [, setSettings] = useAtom(settingsAtom)

  const getSettings = async () => {
    const res = await axios.get(
      `users/${currentRoleName.toLowerCase()}-profile`,
      {
        headers: {
          roleId: currentRoleId,
        },
      }
    )
    if (res.status === 200) {
      setSettings(res.data)
    }
  }

  useEffect(() => {
    getSettings()
  }, [])

  return (
    <div className="w-full flex justify-center">
      <article>
        <Tabs tab={tab} setTab={setTab} tabs={tabs} />
        <TabPanel visible={tab === Tab.Account}>
          <Account />
        </TabPanel>
        <TabPanel visible={tab === Tab.Settings}>
          <Settings />
        </TabPanel>
        <TabPanel visible={tab === Tab.Profile}>
          <Profile />
        </TabPanel>
      </article>
    </div>
  )
}
