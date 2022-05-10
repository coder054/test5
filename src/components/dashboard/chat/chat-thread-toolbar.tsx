import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { formatDistanceToNowStrict } from 'date-fns'
import { useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import PropTypes from 'prop-types'
import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { activeChatRoomAtom } from 'src/atoms/chatAtom'
import { ModalMui } from 'src/components/ModalMui'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import {
  deleteChatRoom,
  ERoomType,
  getUserInfo,
  IChatRoom,
} from 'src/modules/chat/chatService'
import {
  equalStr,
  getBioUrl,
  getErrorMessage,
  getGroupUrl,
  getTeamUrl,
} from 'src/utils/utils'
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal'
import { Trash as TrashIcon } from '../../../icons/trash'
import type { Participant } from '../../../types/chat'

interface ChatThreadToolbarProps {
  participants: Participant[]
}

export const ChatThreadToolbar: FC<ChatThreadToolbarProps> = (props) => {
  const { participants, ...other } = props
  const [activeChatRoom] = useAtom(activeChatRoomAtom) as unknown as [
    activeChatRoom: IChatRoom
  ]
  const { currentRoleId } = useAuth()
  const [modalDelete, setModalDelete] = useState(false)

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

  const renderItemChatProfile = () => {
    if (activeChatRoom.isGroup === false) {
      return <ItemChatProfileUser />
    }

    if (equalStr(activeChatRoom.roomType, ERoomType.TEAM)) {
      return (
        <Link href={getTeamUrl(activeChatRoom.chatRoomId)}>
          <a className=" w-full flex items-center text-white ">
            <ItemChatProfile
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              title="View team"
            />
          </a>
        </Link>
      )
    }

    if (equalStr(activeChatRoom.roomType, ERoomType.GROUP)) {
      return (
        <Link href={getGroupUrl(activeChatRoom.chatRoomId)}>
          <a className=" w-full flex items-center text-white ">
            <ItemChatProfile
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              title="View group"
            />
          </a>
        </Link>
      )
    }
  }

  return (
    <>
      {/*  */}
      <ModalMui
        sx={{ width: 700, top: '50%' }}
        isOpen={modalDelete}
        onClose={() => {
          setModalDelete(false)
        }}
        showXIcon
      >
        <>
          <div className="text-[18px] font-Inter mb-10 2xl:mb-20 ">
            Are you sure you want to delete all Messages?
          </div>
          <div className="flex ">
            <Button
              onClick={() => {
                setModalDelete(false)
              }}
              fullWidth
              size="large"
              sx={{ mr: 2 }}
              variant="outlined"
            >
              No, Cancel
            </Button>
            <Button
              onClick={async () => {
                const { error } = await deleteChatRoom(
                  activeChatRoom.chatRoomId,
                  currentRoleId
                )
                if (error) {
                  toast.error(error)
                } else {
                  toast.success('Deleted')
                  setModalDelete(false)
                }
              }}
              fullWidth
              size="large"
              variant="contained"
            >
              Yes, Delete
            </Button>
          </div>
        </>
      </ModalMui>
      {/*  */}
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
          <MenuItem>{renderItemChatProfile()}</MenuItem>
          <MenuItem
            onClick={() => {
              setModalDelete(true)
              handleMenuClose()
            }}
          >
            <ListItemIcon>
              <TrashIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Remove all messages" />
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
}

ChatThreadToolbar.propTypes = {
  participants: PropTypes.array,
}

ChatThreadToolbar.defaultProps = {
  participants: [],
}

const ItemChatProfile = ({ icon, title }) => (
  <>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </>
)

const ItemChatProfileUser = () => {
  const { currentRoleId, token } = useAuth()
  const [activeChatRoom] = useAtom(activeChatRoomAtom) as unknown as [
    activeChatRoom: IChatRoom
  ]
  const [link, setLink] = useState('')

  useEffect(() => {
    const userName = activeChatRoom.userName
    if (isEmpty(userName) || isEmpty(currentRoleId) || isEmpty(token)) {
      return
    }

    ;(async function () {
      try {
        let userId = activeChatRoom.memberIds.find((o) => o !== currentRoleId)
        if (isEmpty(userId)) {
          return
        }
        const user = await getUserInfo(userId)
        const { type, firstName, lastName } = user

        setLink(getBioUrl(type, activeChatRoom.userName, firstName, lastName))
      } catch (error) {
        alert(getErrorMessage(error))
      }
    })()
  }, [activeChatRoom.userName, currentRoleId, token])

  if (isEmpty(link)) {
    return null
  }

  return (
    <Link href={link}>
      <a className=" w-full flex items-center text-white ">
        <ItemChatProfile
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          title="View profile"
        />
      </a>
    </Link>
  )
}
