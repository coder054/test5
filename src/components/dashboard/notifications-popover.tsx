import {
  Box,
  CircularProgress,
  IconButton,
  List,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
import SimpleBar from 'simplebar-react'
import { ModalMui } from 'src/components/ModalMui'
import { DevelopmentNoteType } from 'src/constants/types'
import { NoteModal } from 'src/modules/dashboard/development-dashboard/component/modal/note-modal'
import { MailOpen as MailOpenIcon } from '../../icons/mail-open'
import { NotificationsList, useNotiList } from '../noti/NotificationsList'
import { Scrollbar } from '../scrollbar'

interface NotificationsPopoverProps {
  anchorEl: null | Element
  onClose?: () => void
  onUpdateUnread?: (value: number) => void
  open?: boolean
}

export const NotificationsPopover: FC<NotificationsPopoverProps> = (props) => {
  const { loading, notifications, setNotifications, unreadCount } =
    useNotiList()

  const [isOpenModalDevelopmentNote, setIsOpenModalDevelopmentNote] =
    useState<boolean>(false)

  const [dataDevelopmentNote] = useState<DevelopmentNoteType>(null)

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
                  <NotificationsList />
                </List>
              </Scrollbar>
            )}
          </>
        )}
      </Popover>
    </>
  )
}
