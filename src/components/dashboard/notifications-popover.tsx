import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useAtom } from 'jotai'
import { get } from 'lodash'
import Link from 'next/link'
import PropTypes from 'prop-types'
import type { FC } from 'react'
import { useEffect, useMemo } from 'react'
import { openModalDiaryUpdateAtom } from 'src/atoms/diaryAtoms'
import { NotificationType } from 'src/constants/types'
import { checkNotification } from 'src/service/notiService'
import { axios } from 'src/utils/axios'
import { getErrorMessage, getStr } from 'src/utils/utils'
import { MailOpen as MailOpenIcon } from '../../icons/mail-open'
import { X as XIcon } from '../../icons/x'
import { notiToast } from '../common/Toast'
import { INoti, useNotiList } from '../noti/NotificationsList'
import { Scrollbar } from '../scrollbar'

interface NotificationsPopoverProps {
  anchorEl: null | Element
  onClose?: () => void
  onUpdateUnread?: (value: number) => void
  open?: boolean
}

const now = new Date()

export const NotificationsPopover: FC<NotificationsPopoverProps> = (props) => {
  const { loading, notifications, setNotifications, unreadCount } =
    useNotiList()

  const { anchorEl, onClose, onUpdateUnread, open, ...other } = props
  // const [notifications, setNotifications] = useState<Notification[]>(data)
  const unread = useMemo(
    () =>
      notifications.reduce(
        (acc, notification) =>
          acc +
          (notification.notificationStatus === 'false' ||
          notification.notificationStatus === false
            ? 1
            : 0),
        0
      ),
    [notifications]
  )

  useEffect(() => {
    console.log('aaa unread: ', unread)
  }, [unread])

  useEffect(() => {
    onUpdateUnread?.(unread)
  }, [onUpdateUnread, unread])

  const handleMarkAllAsRead = (): void => {
    setNotifications((prevState) =>
      prevState.map((notification) => ({
        ...notification,
        read: true,
      }))
    )
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

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 380 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography color="inherit" variant="h6">
          Notifications
        </Typography>
        <Tooltip title="Mark all as read">
          <IconButton
            onClick={handleMarkAllAsRead}
            size="small"
            sx={{ color: 'inherit' }}
          >
            <MailOpenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      {loading ? (
        <div className="flex p-4 items-center justify-center ">
          <CircularProgress />
        </div>
      ) : (
        <>
          {notifications.length === 0 ? (
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2">
                There are no notifications
              </Typography>
            </Box>
          ) : (
            <Scrollbar sx={{ maxHeight: 400 }}>
              <List disablePadding>
                {notifications.map((notification) => (
                  <ItemNotification
                    notification={notification}
                    handleClickOne={handleClickOne}
                    handleRemoveOne={handleRemoveOne}
                    onClose={onClose}
                  />
                ))}
              </List>
            </Scrollbar>
          )}
        </>
      )}
    </Popover>
  )
}

NotificationsPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  onUpdateUnread: PropTypes.func,
  open: PropTypes.bool,
}

export const ItemNotification = ({
  notification,
  handleClickOne,
  handleRemoveOne,
  onClose,
}: {
  notification: INoti
  handleClickOne: Function
  onClose: Function
  handleRemoveOne: Function
}) => {
  const [openModalDiaryUpdate, setOpenModalDiaryUpdate] = useAtom(
    openModalDiaryUpdateAtom
  )

  const renderIcon = () => {
    switch (notification.notificationType) {
      case 'FRIEND_REQUEST':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5  "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        )
        break
      case 'REMIND_ON_DIARY_UPDATE':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        )
        break

      case 'ASK_JOIN_TEAM':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        )
        break

      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
        break
    }
  }

  const link = useMemo(() => {
    switch (notification.notificationType) {
      case NotificationType.ACCEPT_JOIN_TEAM:
      case NotificationType.LEAVE_TEAM:
      case NotificationType.FOLLOW:
      case NotificationType.FOLLOW_REQUEST:
      case NotificationType.REJECT_FOLLOW_REQUEST:
      case NotificationType.ACCEPTED_FOLLOW_REQUEST:
      case NotificationType.REJECT_FRIEND_REQUEST:
      case NotificationType.ACCEPTED_FRIEND_REQUEST:
      case NotificationType.FRIEND_REQUEST:
        return `/${notification.userType === 'PLAYER' ? 'player' : 'coach'}/${
          notification.username
        }/zporter`
        break
      case NotificationType.REMIND_DIARY_UPDATE_LOCAL:
      case NotificationType.REMIND_ON_DIARY_UPDATE:
        return `#`
        break

      case NotificationType.ASK_JOIN_TEAM:
        return `#`
        break

      default:
        return '#'
        break
    }
  }, [])

  return (
    <ListItem
      divider
      key={notification.notificationId}
      sx={{
        alignItems: 'flex-start',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
        '& .MuiListItemSecondaryAction-root': {
          top: '24%',
        },
      }}
      secondaryAction={
        <Tooltip title="Remove">
          <IconButton
            edge="end"
            onClick={() => handleRemoveOne(notification.notificationId)}
            size="small"
          >
            <XIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      }
    >
      <div className="w-full ">
        {/* // here handleClickOnNotiItem */}
        <Link href={link}>
          <a
            onClick={async () => {
              if (notification.notificationType === 'REMIND_ON_DIARY_UPDATE') {
                setOpenModalDiaryUpdate(true)
              }

              await handleClickOne(notification.notificationId)
              onClose()
            }}
            className="text-white hover:text-white inline-block font-Inter text-[14px "
          >
            <div
              className={clsx(
                ` flex w-full `,
                notification.notificationStatus === true
                  ? ' text-Grey opacity-80 '
                  : ' text-white '
              )}
            >
              <div className="w-[56px] h-[56px] mr-[12px] relative ">
                <img
                  src={notification.largeIcon}
                  className="rounded-[8px] w-[56px] -[56px] "
                  alt=""
                />
                <div className="w-[28px] h-[28px] object-cover rounded-full absolute right-[-6px] bottom-[-6px] flex justify-center items-center bg-[#006699] ">
                  {renderIcon()}
                </div>
              </div>

              <div
                className={clsx(
                  `  `,
                  notification.notificationStatus === true
                    ? ' text-Grey opacity-80 '
                    : ' text-white '
                )}
              >
                <div className="font-Inter text-[14px] ">
                  {notification.title}
                </div>
                <div className="font-Inter text-[14px] ">
                  {notification.body}
                </div>

                {(getStr(notification, 'updatedAt') ||
                  getStr(notification, 'createdAt')) && (
                  <div className="font-medium text-[12px] opacity-90 text-[#1876f2]">
                    {format(
                      Number(
                        get(notification, 'updatedAt') ||
                          get(notification, 'createdAt')
                      ),
                      'MMM dd, h:mm a'
                    )}
                  </div>
                )}
              </div>
            </div>
          </a>
        </Link>
      </div>
    </ListItem>
  )
}
