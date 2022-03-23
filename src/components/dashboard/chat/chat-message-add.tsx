import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import VideoThumbnail from 'react-video-thumbnail'
import type { ChangeEvent, FC, KeyboardEvent } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, IconButton, TextField, Tooltip } from '@mui/material'
import { PaperAirplane as PaperAirplaneIcon } from '../../../icons/paper-airplane'
import { Photograph as PhotographIcon } from '../../../icons/photograph'
import { PaperClip as PaperClipIcon } from '../../../icons/paper-clip'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { getStr, resizeFile } from 'src/utils/utils'
import { get } from 'lodash'
import {
  createMessage,
  updateLastMessageTime,
  uploadFile,
  EMessageType,
  database,
  IChatMessage,
  newChatMessage,
  fromBase64ToBlob,
} from 'src/module/chat/chatService'
import { child, push, ref, serverTimestamp } from 'firebase/database'
import { useAtom } from 'jotai'
import { activeChatRoomAtom } from 'src/atoms/chatAtom'

interface ChatMessageAddProps {
  disabled?: boolean
  onSend?: (value: string) => void
}

export const ChatMessageAdd: FC<ChatMessageAddProps> = (props) => {
  const { infoActiveProfile, currentRoleId } = useAuth()
  const [activeChatRoom] = useAtom(activeChatRoomAtom)

  const { disabled, onSend, ...other } = props
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [body, setBody] = useState<string>('')
  const [videoThumbnail, setVideoThumbnail] = useState<any>('')
  const [videoUrl, setVideoUrl] = useState('')
  const [urlVideoUploaded, setUrlVideoUploaded] = useState('')

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

  useEffect(() => {
    console.log('aaa videoThumbnail: ', videoThumbnail)
  }, [videoThumbnail])

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
        src={getStr(infoActiveProfile, 'faceImageUrl')}
      />

      <TextField
        disabled={disabled}
        fullWidth
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Leave a message" // placeholder="Leave a message2"
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
        <Tooltip title="Attach photo or file">
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
      </Box>
      {videoUrl && !!urlVideoUploaded && (
        <div className="hidden ">
          <VideoThumbnail
            renderThumbnail={false}
            videoUrl={videoUrl}
            thumbnailHandler={async (thumbnail) => {
              console.log('aaa thumbnail', thumbnail)
              const blob = await fromBase64ToBlob(thumbnail)
              //@ts-ignore: Unreachable code error
              const imageResized: string = await resizeFile(blob)
              const blobResized = await fromBase64ToBlob(imageResized)

              const { error, url: urlThumb } = await uploadFile(
                blobResized,
                'media',
                uuidv4() + '.jpg'
              )

              let chatRoomId: string = activeChatRoom.chatRoomId

              const newMessageKey = await push(
                child(ref(database), `/chatMessages/${chatRoomId}`)
              ).key

              let message: IChatMessage

              message = newChatMessage().newVideoMessage(
                get(fileInputRef, 'current.files[0].name') || uuidv4(),
                serverTimestamp(),
                currentRoleId,
                newMessageKey,
                urlThumb,
                urlVideoUploaded
              )

              const { error: errorCreateMessage } = await createMessage(
                message,
                chatRoomId
              )

              if (errorCreateMessage) {
                alert('error happen1')
                return
              }
              updateLastMessageTime(chatRoomId, newMessageKey)

              setUrlVideoUploaded('')
              fileInputRef.current.value = ''
              setVideoUrl('')
            }}
            snapshotAtTime={1}
          />
        </div>
      )}

      <input
        // accept="image/png, image/gif, image/jpeg, image/jpg"
        onChange={async (e) => {
          try {
            const file: File = get(e, 'target.files[0]')
            if (!file) {
              return
            }

            let type

            if (file.type.indexOf('image/') === 0) {
              type = 'image'
            } else if (file.type.indexOf('video/') === 0) {
              type = 'video'
            } else {
              type = 'file'
              // lastModified: 1639976362947
              // lastModifiedDate: Mon Dec 20 2021 11:59:22 GMT+0700 (Indochina Time) {}
              // name: "God Rest Ye Merry_ Gentlemen - Mariah Ca.mp3"
              // size: 3177201
              // type: "audio/mpeg"
              // webkitRelativePath: ""
            }

            ///////////////////////////////// video /////////////////////////////////
            if (type === 'video') {
              const videoUploadName = `${uuidv4()}-${file.name || ''}`
              const { error, url } = await uploadFile(
                file,
                'message',
                videoUploadName
              )

              if (error) {
                return
              }
              setUrlVideoUploaded(url)
              setVideoUrl(URL.createObjectURL(file))
              // will upload in <VideoThumbnail>
              return
            }
            ///////////////////////////////// video /////////////////////////////////

            ///////////////////////////////// image /////////////////////////////////
            if (type === 'image') {
              const imageUploadName = `${uuidv4()}-${file.name || ''}`
              const { error, url } = await uploadFile(
                file,
                'message',
                imageUploadName
              )

              if (error) {
                return
              }

              let chatRoomId: string = activeChatRoom.chatRoomId
              const newMessageKey = await push(
                child(ref(database), `/chatMessages/${chatRoomId}`)
              ).key

              let message: IChatMessage
              message = {
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
                alert('error happen2')
                return
              }
              updateLastMessageTime(chatRoomId, newMessageKey)
              fileInputRef.current.value = ''
              return
            }
            ///////////////////////////////// image /////////////////////////////////

            ///////////////////////////////// file /////////////////////////////////
            if (type === 'file') {
              const fileUploadName = `${uuidv4()}-${file.name || ''}`
              const { error, url } = await uploadFile(
                file,
                'message',
                fileUploadName
              )

              if (error) {
                return
              }

              let chatRoomId: string = activeChatRoom.chatRoomId
              const newMessageKey = await push(
                child(ref(database), `/chatMessages/${chatRoomId}`)
              ).key

              let message: IChatMessage

              message = newChatMessage().newFileMessage(
                file.name,
                serverTimestamp(),
                currentRoleId,
                newMessageKey,
                url,
                file.size
              )

              const { error: errorCreateMessage } = await createMessage(
                message,
                chatRoomId
              )

              if (errorCreateMessage) {
                alert('error happen3')
                return
              }
              updateLastMessageTime(chatRoomId, newMessageKey)
              fileInputRef.current.value = ''
              return
            }
            ///////////////////////////////// file /////////////////////////////////
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
