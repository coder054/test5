import { FC, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import type { Message, Participant } from '../../../types/chat'
import { ChatMessage } from './chat-message'
import { IChatMessage } from 'src/modules/chat/chatService'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { get, isEmpty } from 'lodash'
import { AVATAR_DEFAULT } from 'src/constants/constants'

interface ChatMessagesProps {
  messages: IChatMessage[]
  participants: Participant[]
  arrUsers: any[]
}

export const ChatMessages: FC<ChatMessagesProps> = (props) => {
  const { currentRoleId } = useAuth()

  const { messages, participants, arrUsers, ...other } = props

  const getUserOfMessage = useCallback(
    (createdBy) => {
      if (isEmpty(arrUsers) || !createdBy) {
        return {}
      }

      let find = arrUsers.find((o) => o.userId === createdBy)

      if (isEmpty(find)) {
        return {}
      }

      return find
    },
    [arrUsers]
  )

  return (
    <Box sx={{ p: 2 }} {...other}>
      {messages.map((message, index) => {
        const user = getUserOfMessage(message.createdBy)
        let authorAvatar
        let authorName
        let authorType

        authorAvatar = user.faceImage || AVATAR_DEFAULT
        authorName = 'Someone'
        authorType = 'contact'

        if (message.createdBy === currentRoleId) {
          authorName = 'Me'
          authorType = 'user'
        } else {
          authorName = user.firstName + ' ' + user.lastName
          authorType = 'contact'
        }

        return (
          <ChatMessage
            message={message}
            authorAvatar={authorAvatar}
            authorName={authorName}
            authorType={authorType} // 'contact' | 'user'  ,contact will display on the left, current user's messages display on the right
            body={message.text}
            contentType={message.type} // text, image
            createdAt={message.createdAt}
            createdBy={message.createdBy}
            imageUrl={message.type === 'image' ? message.uri : ''}
            videoUrl={
              message.type === 'custom' && !!message.thumbVideo
                ? message.uri
                : ''
            }
            fileMeta={
              message.type === 'file' && !!message.uri
                ? {
                    fileUrl: message.uri,
                    attachmentName: message.attachmentName,
                    size: message.size,
                  }
                : null
            }
            previewData={get(message, 'previewData')}
            key={index}
          />
        )
      })}
    </Box>
  )
}

ChatMessages.propTypes = {
  // @ts-ignore
  messages: PropTypes.array,
  participants: PropTypes.array,
}
