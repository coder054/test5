import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem, Popover,
  Tooltip,
  Typography
} from '@mui/material'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useAtom } from 'jotai'
import Link from 'next/link'
import PropTypes from 'prop-types'
import type { FC } from 'react'
import { useEffect, useMemo } from 'react'
import { openModalDiaryUpdateAtom } from 'src/atoms/diaryAtoms'
import { axios } from 'src/utils/axios'
import { getErrorMessage } from 'src/utils/utils'
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
        (acc, notification) => acc + (notification.notificationStatus ? 0 : 1),
        0
      ),
    [notifications]
  )

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
      await axios.patch(`/notifications/${notificationId}/check-notification`)
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
                          onClick={() =>
                            handleRemoveOne(notification.notificationId)
                          }
                          size="small"
                        >
                          <XIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ItemNotification
                      notification={notification}
                      handleClickOne={handleClickOne}
                      onClose={onClose}
                    />
                  </ListItem>
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

const ItemNotification = ({
  notification,
  handleClickOne,
  onClose,
}: {
  notification: INoti
  handleClickOne: Function
  onClose: Function
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
      case 'FRIEND_REQUEST':
        return `/${notification.userType === 'PLAYER' ? 'player' : 'coach'}/${
          notification.username
        }/zporter`
        break
      case 'REMIND_ON_DIARY_UPDATE':
        return `#`
        break

      default:
        return '#'
        break
    }
  }, [])

  return (
    <div className="w-full ">
      <Link href={link}>
        <a
          onClick={async () => {
            if (notification.notificationType === 'REMIND_ON_DIARY_UPDATE') {
              setOpenModalDiaryUpdate(true)
            }

            await handleClickOne(notification.notificationId)
            onClose()
          }}
          className="text-white hover:text-white inline-block font-Inter text-[14px] "
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
                className="rounded-full w-[56px] h-[56px]  "
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
              <h5 className=" ">
                <span className=" "> {notification.body} </span>
              </h5>
              <div className="font-medium text-[12px] opacity-90 text-[#1876f2]">
                {format(notification.updatedAt, 'MMM dd, h:mm a')}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}
