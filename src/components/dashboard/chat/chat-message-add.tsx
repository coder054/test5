import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FC, KeyboardEvent } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, IconButton, TextField, Tooltip } from '@mui/material'
import { PaperAirplane as PaperAirplaneIcon } from '../../../icons/paper-airplane'
import { Photograph as PhotographIcon } from '../../../icons/photograph'
import { PaperClip as PaperClipIcon } from '../../../icons/paper-clip'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { getStr } from 'src/utils/utils'
import { get } from 'lodash'
import {
  createMessage,
  updateLastMessageTime,
  uploadFile,
  EMessageType,
  database,
  IChatMessage,
} from 'src/module/chat/chatService'
import { child, push, ref, serverTimestamp } from 'firebase/database'
import { useAtom } from 'jotai'
import { activeChatRoomAtom } from 'src/atoms/chatAtom'

interface ChatMessageAddProps {
  disabled?: boolean
  onSend?: (value: string) => void
}

export const ChatMessageAdd: FC<ChatMessageAddProps> = (props) => {
  const { playerProfile, currentRoleId } = useAuth()
  const [activeChatRoom] = useAtom(activeChatRoomAtom)

  const { disabled, onSend, ...other } = props
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [body, setBody] = useState<string>('')

  const handleAttach = (): void => {
    fileInputRef.current.click()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setBody(event.target.value)
  }

  const handleSend = (): void => {
    if (!body) {
      return
    }

    onSend?.(body)
    setBody('')
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      handleSend()
    }
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexShrink: 0,
        p: 3,
      }}
      {...other}
    >
      <Avatar
        sx={{
          display: {
            xs: 'none',
            sm: 'inline',
          },
          mr: 2,
        }}
        src={getStr(playerProfile, 'media.faceImage')}
      />

      <TextField
        disabled={disabled}
        fullWidth
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Leave a message2"
        value={body}
        size="small"
      />

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          m: -2,
          ml: 2,
        }}
      >
        <Tooltip title="Send">
          <Box sx={{ m: 1 }}>
            <IconButton
              color="primary"
              disabled={!body || disabled}
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
              onClick={handleSend}
            >
              <PaperAirplaneIcon fontSize="small" />
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title="Attach photo">
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'inline-flex',
              },
              m: 1,
            }}
          >
            <IconButton disabled={disabled} edge="end" onClick={handleAttach}>
              <PhotographIcon fontSize="small" />
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title="Attach file">
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'inline-flex',
              },
              m: 1,
            }}
          >
            <IconButton disabled={disabled} edge="end" onClick={handleAttach}>
              <PaperClipIcon fontSize="small" />
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
      <input
        accept="image/png, image/gif, image/jpeg"
        onChange={async (e) => {
          try {
            const file: File = get(e, 'target.files[0]')
            if (!file) {
              return
            }

            const { error, url } = await uploadFile(file, 'message')

            if (error) {
              return
            }
            let chatRoomId: string = activeChatRoom.chatRoomId
            const newMessageKey = await push(
              child(ref(database), `/chatMessages/${chatRoomId}`)
            ).key

            let message: IChatMessage = {
              createdAt: serverTimestamp(), // 1646731132428,
              createdBy: currentRoleId,
              messageId: newMessageKey,
              attachmentName: file.name,
              size: file.size,
              type: EMessageType.image,
              uri: url,
            }

            const { error: errorCreateMessage } = await createMessage(
              message,
              chatRoomId
            )

            if (errorCreateMessage) {
              alert('error happen')
              return
            }
            updateLastMessageTime(chatRoomId, newMessageKey)
          } catch (err) {
            console.error(err)
          }
        }}
        hidden
        ref={fileInputRef}
        type="file"
      />
    </Box>
  )
}

ChatMessageAdd.propTypes = {
  disabled: PropTypes.bool,
  onSend: PropTypes.func,
}

ChatMessageAdd.defaultProps = {
  disabled: false,
}
