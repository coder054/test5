import { settingsAtom } from 'atoms/accountAndSettings'
import { TabPanel, Tabs } from 'components/Tabs'
import {
  API_COACH_PROFILE,
  API_GET_CONTRY_LIST,
  API_GET_USER_ROLES,
} from 'constants/api.constants'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { axios } from 'utils/axios'
import { Account } from './components/account/Account'
import { Profile } from './components/profile/Profiile'
import { Settings } from './components/settings/Settings'

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
  const cookies = new Cookies()
  const [tab, setTab] = useState(Tab.Account)
  const [, setSettings] = useAtom(settingsAtom)

  const getUserRole = async () => {
    const res = await axios.get(API_GET_USER_ROLES)
    cookies.set('roleId', res.data[0].roleId)
    cookies.set('roleName', res.data[0].role)
  }

  const getSettings = async () => {
    const roleId = cookies.get('roleId')
    const res = await axios.get(API_COACH_PROFILE, {
      headers: {
        roleId: roleId,
      },
    })
    if (res.status === 200) {
      setSettings(res.data)
    }
  }

  const getListCountry = async () => {
    const res = await axios.get(API_GET_CONTRY_LIST)
    localStorage.setItem(
      'countries',
      JSON.stringify(
        res.data.map((it: any) => ({
          name: it.name,
          code: it.alpha2Code,
        }))
      )
    )
  }

  useEffect(() => {
    getUserRole()
    getListCountry()
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
