import { notification } from 'antd'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MySwitchButton } from 'src/components/MySwitchButton'
import { API_COACH_SETTINGS } from 'src/constants/api.constants'
import { NotificationsType } from 'src/constants/types/settingsType.type'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { axios } from 'src/utils/axios'
import { BackGround } from '../../common-components/Background'
import { Item } from '../../common-components/ItemSwitch'
import { useAuth } from 'src/module/authen/auth/AuthContext'

export const Notifications = () => {
  const { currentRoleName, currentRoleId } = useAuth()
  const [account, setAccount] = useAtom(settingsAtom)

  const [switchAll, setSwitchAll] = useState<boolean | undefined>(false)
  const [notifications, setNotifications] = useState<NotificationsType>({
    profileAndDiaryUpdates: false,
    feedUpdates: false,
    messageUpdates: false,
    inviteUpdates: false,
  })

  const handleSwitchAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = {
      profileAndDiaryUpdates: event.target.checked,
      feedUpdates: event.target.checked,
      messageUpdates: event.target.checked,
      inviteUpdates: event.target.checked,
    }
    handleChangeNotifications(data, event.target.checked)
  }

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    })
  }

  const handleChangeNotifications = async (data: any, isSetAll?: boolean) => {
    isSetAll && setSwitchAll(isSetAll)
    setNotifications({
      ...notifications,
      ...data,
    })
    await axios
      .patch(
        `users/${currentRoleName.toLowerCase()}/settings`,
        {
          settings: { ...account.settings, notificationOptions: { ...data } },
        },
        {
          headers: {
            roleId: currentRoleId,
          },
        }
      )
      .then(() => {
        setAccount({
          ...account,
          settings: { ...account.settings, notificationOptions: { ...data } },
        })
      })
      .catch(() => {
        notification['error']({
          message: 'Error',
          description: '',
        })
      })
  }

  useEffect(() => {
    if (Object.values(notifications).some((it) => it)) {
      setSwitchAll(true)
    } else setSwitchAll(false)
  }, [notifications])

  useEffect(() => {
    account.settings?.notificationOptions &&
      setNotifications({ ...account.settings?.notificationOptions })
  }, [account])

  return (
    <>
      <BackGround
        label="Notifications in general"
        form={
          <div className="space-y-5">
            <Item
              className="justify-end border-b-2 border-[#484A4D] pb-[21px] mb-[21px]"
              icon={
                <MySwitchButton
                  checked={switchAll}
                  onChange={handleSwitchAll}
                  name="all"
                />
              }
            />
            <Item
              isChecked={notifications.profileAndDiaryUpdates}
              label="Reminders on profile and diary updates"
              icon={
                <MySwitchButton
                  checked={notifications.profileAndDiaryUpdates}
                  onChange={handleSwitch}
                  name="profileAndDiaryUpdates"
                />
              }
            />
            <Item
              isChecked={notifications.feedUpdates}
              label="Feed updates, likes comments etc."
              icon={
                <MySwitchButton
                  checked={notifications.feedUpdates}
                  onChange={handleSwitch}
                  name="feedUpdates"
                />
              }
            />
            <Item
              isChecked={notifications.messageUpdates}
              label="Messages from your friends etc."
              icon={
                <MySwitchButton
                  checked={notifications.messageUpdates}
                  onChange={handleSwitch}
                  name="messageUpdates"
                />
              }
            />
            <Item
              isChecked={notifications.inviteUpdates}
              label="Invites to tests, challenges, events etc."
              icon={
                <MySwitchButton
                  checked={notifications.inviteUpdates}
                  onChange={handleSwitch}
                  name="inviteUpdates"
                />
              }
            />
            <Item label="Integrations" />
          </div>
        }
      />
    </>
  )
}
