import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import type { FC } from 'react'
import PropTypes from 'prop-types'
import { format, subDays, subHours } from 'date-fns'
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material'
import { ChatAlt as ChatAltIcon } from '../../icons/chat-alt'
import { MailOpen as MailOpenIcon } from '../../icons/mail-open'
import { X as XIcon } from '../../icons/x'
import { UserCircle as UserCircleIcon } from '../../icons/user-circle'
import { Notification } from '../../types/notification'
import { Scrollbar } from '../scrollbar'
import { INoti, useNotiList } from '../noti/NotificationsList'
import clsx from 'clsx'
import { axios } from 'src/utils/axios'
import { notiToast } from '../common/Toast'
import { getErrorMessage } from 'src/utils/utils'

interface NotificationsPopoverProps {
  anchorEl: null | Element
  onClose?: () => void
  onUpdateUnread?: (value: number) => void
  open?: boolean
}

const now = new Date()

const getNotificationContent = (
  notification: INoti,
  handleClickOne: Function,
  onClose: Function
): JSX.Element => {
  switch (notification.notificationType) {
    case 'FRIEND_REQUEST':
      return (
        <ItemNotification
          notification={notification}
          handleClickOne={handleClickOne}
          onClose={onClose}
        />
      )
    case 'REMIND_ON_DIARY_UPDATE':
      return null

    default:
      return null
  }
}

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
                    {getNotificationContent(
                      notification,
                      handleClickOne,
                      onClose
                    )}
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

      default:
        return null
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
                <span className=" font-bold ">{notification.username} </span>
                <span className=" ">sent you a friend request.</span>
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
