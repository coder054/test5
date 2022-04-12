import { useRef, useState, useMemo } from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNowStrict } from 'date-fns'
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { Archive as ArchiveIcon } from '../../../icons/archive'
import { Bell as BellIcon } from '../../../icons/bell'
import { Ban as BanIcon } from '../../../icons/ban'
import { Camera as CameraIcon } from '../../../icons/camera'
import { Phone as PhoneIcon } from '../../../icons/phone'
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal'
import { Trash as TrashIcon } from '../../../icons/trash'
import type { Participant } from '../../../types/chat'
import { useAtom } from 'jotai'
import { activeChatRoomAtom } from 'src/atoms/chatAtom'
import { IChatRoom } from 'src/modules/chat/chatService'
import { get, isEmpty } from 'lodash'

interface ChatThreadToolbarProps {
  participants: Participant[]
}

export const ChatThreadToolbar: FC<ChatThreadToolbarProps> = (props) => {
  const { participants, ...other } = props
  const [activeChatRoom] = useAtom(activeChatRoomAtom) as unknown as [
    activeChatRoom: IChatRoom
  ]
  const moreRef = useRef<HTMLButtonElement | null>(null)
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    id: '5e86809283e28b96d2d38537',
  }

  const recipients = participants.filter(
    (participant) => participant.id !== user.id
  )
  const name = recipients
    .reduce((names, participant) => [...names, participant.name], [])
    .join(', ')

  const handleMenuOpen = (): void => {
    setOpenMenu(true)
  }

  const handleMenuClose = (): void => {
    setOpenMenu(false)
  }

  const imagesChatRoom = useMemo(() => {
    if (isEmpty(activeChatRoom)) {
      return []
    }
    if (!!activeChatRoom.chatRoomImage) {
      return [activeChatRoom.chatRoomImage] || []
    }
    return activeChatRoom.userFaceImages || []
  }, [activeChatRoom])

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        display: 'flex',
        flexShrink: 0,
        minHeight: 64,
        px: 2,
        py: 1,
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <AvatarGroup
          max={2}
          sx={{
            ...(imagesChatRoom.length > 1 && {
              '& .MuiAvatar-root': {
                height: 30,
                width: 30,
                '&:nth-of-type(2)': {
                  mt: '10px',
                },
              },
            }),
          }}
        >
          {imagesChatRoom.map((imgUrl) => (
            <Avatar key={imgUrl} src={imgUrl} />
          ))}
        </AvatarGroup>

        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">
            {activeChatRoom.chatRoomName}
          </Typography>
          {recipients.length === 1 && (
            <Typography color="textSecondary" variant="caption">
              Last active{' '}
              {formatDistanceToNowStrict(recipients[0].lastActivity, {
                addSuffix: true,
              })}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton>
        <PhoneIcon fontSize="small" />
      </IconButton>
      <IconButton>
        <CameraIcon fontSize="small" />
      </IconButton>
      <Tooltip title="More options">
        <IconButton onClick={handleMenuOpen} ref={moreRef}>
          <DotsHorizontalIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        keepMounted
        onClose={handleMenuClose}
        open={openMenu}
      >
        <MenuItem>
          <ListItemIcon>
            <BanIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Block contact" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <TrashIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete thread" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Archive thread" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BellIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mute notifications" />
        </MenuItem>
      </Menu>
    </Box>
  )
}

ChatThreadToolbar.propTypes = {
  participants: PropTypes.array,
}

ChatThreadToolbar.defaultProps = {
  participants: [],
}
