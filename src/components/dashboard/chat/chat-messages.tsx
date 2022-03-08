import type { FC } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import type { Message, Participant } from '../../../types/chat'
import { ChatMessage } from './chat-message'
import { IChatMessage } from 'src/module/chat/chatService'
import { useAuth } from 'src/module/authen/auth/AuthContext'

interface ChatMessagesProps {
  messages: IChatMessage[]
  participants: Participant[]
}

export const ChatMessages: FC<ChatMessagesProps> = (props) => {
  const { currentRoleId } = useAuth()

  const { messages, participants, ...other } = props

  const user = {
    avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
    name: 'Anika Visser',
  }

  return (
    <Box sx={{ p: 2 }} {...other}>
      {messages.map((message, index) => {
        let authorAvatar
        let authorName
        let authorType

        // authorAvatar = user.avatar
        // authorName = 'Me'
        // authorType = 'user'

        authorAvatar = user.avatar
        authorName = 'Someone'
        authorType = 'contact'

        if (message.createdBy === currentRoleId) {
          authorAvatar = user.avatar
          authorName = 'Me'
          authorType = 'user'
        } else {
          authorAvatar = ''
          authorName = 'atiserae eiwtsriatr'
          authorType = 'contact'
        }

        return (
          <ChatMessage
            authorAvatar={authorAvatar}
            authorName={authorName}
            authorType={authorType} // 'contact' | 'user'  ,contact will display on the left, current user's messages display on the right
            body={message.text}
            contentType={message.type} // text, image
            createdAt={message.createdAt}
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
