import { CircularProgress } from '@mui/material'
import { useAtom } from 'jotai'
import { chain, isEmpty } from 'lodash'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { notificationsAtom } from 'src/atoms/notiAtoms'
import { checkNotification } from 'src/service/notiService'
import { axios } from 'src/utils/axios'
import { getErrorMessage } from 'src/utils/utils'
import { notiToast } from '../common/Toast'
import { ItemNotification } from '../dashboard/notifications-popover'

// Generated by https://quicktype.io

export interface INoti {
  senderId: string
  notificationStatus: boolean
  createdAt: number
  receiverId: string
  body: Body
  title: Title
  username: Username
  userType: UserType
  updatedAt: number
  notificationType: NotificationType
  largeIcon: string
  notificationId: string
  teamId?: string
  groupId?: string
}

export enum Body {
  Aaabbb911110ASentYouAFriendRequest = '#aaabbb911110A sent you a friend request',
  The3DSinceYouUpdatedYourDiaryNow = '3d since you updated your diary now!',
}

export enum NotificationType {
  FriendRequest = 'FRIEND_REQUEST',
  RemindOnDiaryUpdate = 'REMIND_ON_DIARY_UPDATE',
  ASK_JOIN_TEAM = 'ASK_JOIN_TEAM',
}

export enum Title {
  Zporter = 'Zporter',
  ZporterDiary = 'Zporter Diary',
}

export enum UserType {
  Player = 'PLAYER',
  SysAdmin = 'SYS_ADMIN',
}

export enum Username {
  Aaabbb911110A = 'aaabbb911110A',
  Zporter = 'Zporter',
}

export const NotificationsList = () => {
  const { loading, notifications, setNotifications, unreadCount } =
    useNotiList()

  const renderNotis = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-4 ">
          <CircularProgress />
        </div>
      )
    }

    if (isEmpty(notifications)) {
      return 'No notifications'
    }

    const handleClickOne = async (notificationId) => {
      try {
        await checkNotification(notificationId)
        setNotifications((prevState) =>
          prevState.map((notification) => {
            if (notification.notificationId === notificationId) {
              return Object.assign({}, notification, {
                notificationStatus: true,
              })
            } else {
              return notification
            }
          })
        )
      } catch (error) {
        notiToast({
          message: getErrorMessage(error),
          type: 'error',
        })
      }
    }

    const handleRemoveOne = async (notificationId) => {
      try {
        await axios.delete(
          `/notifications/delete-notification?notificationId=${notificationId}`
        )
        setNotifications((prevState) =>
          prevState.filter((notification) => {
            return notification.notificationId !== notificationId
          })
        )
      } catch (error) {
        notiToast({
          message: getErrorMessage(error),
          type: 'error',
        })
      }
    }

    return (
      <>
        {notifications.map((notification) => {
          return (
            <ItemNotification
              notification={notification}
              handleClickOne={handleClickOne}
              handleRemoveOne={handleRemoveOne}
              onClose={() => {}}
            />
          )
        })}
      </>
    )
  }

  return (
    <div className="p-4 ">
      <div className="mx-auto w-full max-w-[500px] ">
        <div className="font-bold mb-[20px] ">Notifications</div>
        {renderNotis()}
      </div>
    </div>
  )
}

export const useNotiList = () => {
  // const [notifications, setNotifications] = useState<INoti[]>([])
  const [notifications, setNotifications] = useAtom(notificationsAtom)
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const getListNoti = async () => {
    try {
      setLoading(true)
      const params = {
        limit: 100,
        sorted: 'asc',
      }
      const { data } = await axios.get(
        `/notifications/get-list-notifications?${queryString.stringify(params)}`
      )
      setNotifications(data.data)
      setUnreadCount(data.unreadNotification)
    } catch (error) {
      notiToast({
        message: getErrorMessage(error),
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListNoti()
  }, [])
  return {
    loading,
    notifications,
    setNotifications,
    unreadCount,
  }
}
