import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChatAlt2 as ChatAlt2Icon } from './../../../icons/chat-alt2'
import { chain, get, isEmpty } from 'lodash'
import { useAtom } from 'jotai'
import {
  activeChatRoomAtom,
  chatRoomsAtom,
  useActiveRoomId,
} from 'src/atoms/chatAtom'
import type { FC } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Box, Divider, Avatar, Typography } from '@mui/material'
import {
  addMessage,
  getThread,
  markThreadAsSeen,
  setActiveThread,
} from '../../../slices/chat'

import type { RootState } from '../../../store'
import { Scrollbar } from '../../scrollbar'
import type { Participant, Thread } from '../../../types/chat'
import { ChatMessageAdd } from './chat-message-add'
import { ChatMessages } from './chat-messages'
import { ChatThreadToolbar } from './chat-thread-toolbar'
import { chatApi } from '../../../__fake-api__/chat-api'
import {
  query,
  ref,
  orderByChild,
  startAt,
  limitToLast,
  startAfter,
  serverTimestamp,
  push,
  child,
} from 'firebase/database'
import { useObject } from 'react-firebase-hooks/database'
import {
  database,
  getChatUser,
  IChatMessage,
  IChatRoom,
  IChatUser,
  createMessage,
  updateLastMessageTime,
  IPreviewData,
  newChatMessage,
  getPreviewData,
} from 'src/modules/chat/chatService'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'

interface ChatThreadProps {}

const threadSelector = (state: RootState): Thread | undefined => {
  const { threads, activeThreadId } = state.chat

  return threads.byId[activeThreadId]
}

export const ChatThread: FC<ChatThreadProps> = (props) => {
  const { currentRoleId } = useAuth()

  const [activeChatRoom] = useAtom(activeChatRoomAtom) as unknown as [
    activeChatRoom: IChatRoom
  ]

  const [arrUsers, setArrUsers] = useState([])

  const [snapshot, loading, error] = useObject(
    // ref(database, `chatMessages/${activeChatRoom.chatRoomId}`)
    query(
      ref(database, `chatMessages/${activeChatRoom.chatRoomId}`),
      orderByChild('createdAt'),
      startAt(activeChatRoom.deletedDate),
      limitToLast(50)
    )
  )
  // useList(
  //   query(ref(database, 'chatRooms'), orderByChild('updatedAt'))
  // )

  const router = useRouter()

  const messagesRef = useRef<any>(null)
  const [participants, setParticipants] = useState<Participant[]>([])

  const messages = useMemo(() => {
    if (isEmpty(snapshot)) {
      return []
    }

    if (!snapshot.exists()) {
      return []
    }

    const object = snapshot.val()
    const arr = Object.entries(object)

    let arrMessages: IChatMessage[]

    //@ts-ignore: Unreachable code error
    arrMessages = arr.map(([key, value]) => {
      return value
    })

    return arrMessages
  }, [snapshot])

  useEffect(() => {
    let active = true
    load()
    return () => {
      active = false
    }

    async function load() {
      if (isEmpty(messages)) {
        return
      }

      setArrUsers([]) // this is optional
      /////////////////////////
      let listcreatedById = messages.map((message) => {
        //@ts-ignore: Unreachable code error
        return message.createdBy
      })

      listcreatedById = chain(listcreatedById).compact().uniq().value()

      const promises = listcreatedById.map(async (createdBy) => {
        let chatUser: IChatUser
        chatUser = await getChatUser(createdBy)
        return chatUser
      })

      const values = await Promise.all(promises)

      /////////////////////////
      if (!active) {
        return
      }
      setArrUsers(values)
    }
  }, [messages])

  useEffect(() => {
    
    console.log('aaa messages: ', messages)
  }, [messages])

  useEffect(() => {
    // Scroll to bottom of the messages after loading the thread
    if (messagesRef?.current) {
      const scrollElement = messagesRef.current.getScrollElement()

      // scrollElement.scrollTop = messagesRef.current.el.scrollHeight

      scrollElement.scrollTo({
        top: messagesRef.current.el.scrollHeight,
        behavior: 'smooth',
      })

      let inputSendMessage = document.getElementById('inputSendMessage')
      if (isEmpty(inputSendMessage)) {
        return
      }
      inputSendMessage.focus()
    }
  }, [messages])

  useEffect(() => {
    let inputSendMessage = document.getElementById('inputSendMessage')
    if (isEmpty(inputSendMessage)) {
      return
    }
    inputSendMessage.focus()
  }, [document.getElementById('inputSendMessage')])

  // If we have the thread, we use its ID to add a new message
  // Otherwise we use the recipients IDs. When using participant IDs, it means that we have to
  // get the thread.

  const handleSendMessage = async (body: string): Promise<void> => {
    try {
      var urlRegex =
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi

      let link = get(body.match(urlRegex), '[0]')
      if (!!link) {
        let chatRoomId: string = activeChatRoom.chatRoomId
        const newMessageKey = await push(
          child(ref(database), `/chatMessages/${chatRoomId}`)
        ).key

        const { data, error: errorGetPreviewData } = await getPreviewData(link)
        if (errorGetPreviewData) {
          return
        }

        const { description, hostname, image, siteName, title, url } = data

        let previewData: IPreviewData = {
          description: description || '',
          link: link || '',
          title: title || '',
        }
        if (!isEmpty(image)) {
          previewData.image = {
            height: 630,
            url: image,
            width: 1200,
          }
        }
        let message = newChatMessage().newLinkMessage(
          //@ts-ignore: Unreachable code error
          serverTimestamp(),
          currentRoleId,
          newMessageKey,
          body,
          previewData
        )

        const { error } = await createMessage(message, chatRoomId)

        if (error) {
          alert('error happen4')
          return
        }
        updateLastMessageTime(chatRoomId, newMessageKey)
      } else {
        let chatRoomId: string = activeChatRoom.chatRoomId
        const newMessageKey = await push(
          child(ref(database), `/chatMessages/${chatRoomId}`)
        ).key

        let message: IChatMessage = {
          createdAt: serverTimestamp(), // 1646731132428,
          createdBy: currentRoleId,
          messageId: newMessageKey,
          text: body,
          type: 'text',
        }

        const { error } = await createMessage(message, chatRoomId)

        if (error) {
          alert('error happen5')
          return
        }
        updateLastMessageTime(chatRoomId, newMessageKey)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
      }}
      {...props}
    >
      <ChatThreadToolbar participants={participants} />

      {activeChatRoom.lastMessageContent === '' ? (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              height: 56,
              width: 56,
            }}
          >
            <ChatAlt2Icon fontSize="small" />
          </Avatar>
          <Typography color="textSecondary" sx={{ mt: 2 }} variant="subtitle1">
            Send your first message!
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: 'background.default',
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          <Scrollbar ref={messagesRef} sx={{ maxHeight: '100%' }}>
            {/* @ts-ignore: Unreachable code error */}
            <ChatMessages
              arrUsers={arrUsers}
              messages={messages}
              participants={[]}
            />
          </Scrollbar>
        </Box>
      )}

      <Divider />
      <ChatMessageAdd disabled={false} onSend={handleSendMessage} />
    </Box>
  )
}

ChatThread.propTypes = {
  threadKey: PropTypes.string.isRequired,
}
