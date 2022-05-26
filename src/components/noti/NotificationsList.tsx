import { CircularProgress } from '@mui/material'
import { useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import SimpleBar from 'simplebar-react'
import { notificationsAtom } from 'src/atoms/notiAtoms'
import { notiToast } from 'src/components/common/Toast'
import { ModalMui } from 'src/components/ModalMui'
import { DevelopmentNoteType } from 'src/constants/types'
import { NoteModal } from 'src/modules/dashboard/development-dashboard/component/modal/note-modal'
import { checkNotification } from 'src/service/notiService'
import { axios } from 'src/utils/axios'
import { getErrorMessage } from 'src/utils/utils'
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
  playerDiaryData?: any
  coachDiaryData?: any
  playerNotedAt?: any
  postId?: string
  typeOfPost?: string
  diaryId?: string
  developmentNoteData?: DevelopmentNoteData
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
  const [isOpenModalDevelopmentNote, setIsOpenModalDevelopmentNote] =
    useState<boolean>(false)

  const [dataDevelopmentNote, setDataDevelopmentNote] =
    useState<DevelopmentNoteType>(null)
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
        <ModalMui
          sx={{
            padding: 0,
            top: '50%',
            width: isMobile ? '100%' : 700,
            overflow: 'auto',
          }}
          isOpen={isOpenModalDevelopmentNote}
          onClose={setIsOpenModalDevelopmentNote}
        >
          <SimpleBar style={{ maxHeight: 850 }}>
            <NoteModal
              setIsOpenModal={setIsOpenModalDevelopmentNote}
              item={dataDevelopmentNote}
              update
            />
          </SimpleBar>
        </ModalMui>
        {notifications.map((notification) => {
          return (
            <ItemNotification
              setDataDevelopmentNote={setDataDevelopmentNote}
              setIsOpenModalDevelopmentNote={setIsOpenModalDevelopmentNote}
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

////
// Generated by https://quicktype.io

export interface DevelopmentNoteData {
  strength: BestDevelopSkills
  weaknesses: BestDevelopSkills
  coachNotedAt?: number
  coachId?: string
  shortTermGoal: BestDevelopSkills
  devTalkId: string
  longTermGoal: BestDevelopSkills
  playerId: string
  bestWayToDevelop: BestDevelopSkills
  skillsNeededToDevelop: BestDevelopSkills
  bestDevelopSkills: BestDevelopSkills
  otherComments: BestDevelopSkills
  coachDevelopmentProgress?: string
  playerNotedAt: number | string | Date
  updatedAt: number
  createdAt: number
  playerDevelopmentProgress: string
}

export interface BestDevelopSkills {
  playerContent: string
  coachComment: string
}
