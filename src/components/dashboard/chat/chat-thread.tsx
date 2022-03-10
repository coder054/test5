import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { chain, isEmpty } from 'lodash'
import { useAtom } from 'jotai'
import {
  activeChatRoomAtom,
  chatRoomsAtom,
  useActiveRoomId,
} from 'src/atoms/chatAtom'
import type { FC } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Box, Divider } from '@mui/material'
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
} from 'src/module/chat/chatService'
import { useAuth } from 'src/module/authen/auth/AuthContext'

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

    console.log('aaa arrMessages', arrMessages)
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
    console.log('aaa activeChatRoom: ', activeChatRoom)
  }, [activeChatRoom])

  useEffect(() => {
    console.log('aaa error: ', error)
  }, [error])

  useEffect(() => {
    // Scroll to bottom of the messages after loading the thread
    if (!isEmpty(messages) && messagesRef?.current) {
      const scrollElement = messagesRef.current.getScrollElement()

      // scrollElement.scrollTop = messagesRef.current.el.scrollHeight

      scrollElement.scrollTo({
        top: messagesRef.current.el.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  // If we have the thread, we use its ID to add a new message
  // Otherwise we use the recipients IDs. When using participant IDs, it means that we have to
  // get the thread.
  const handleSendMessage = async (body: string): Promise<void> => {
    try {
      let chatRoomId: string = activeChatRoom.chatRoomId
      // let refKey = ChatService.instance.databaseReference
      //   .child(ChatService.instance.chatRoomsNode)
      //   .push();

      // Get a key for a new Post.
      const newMessageKey = push(
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
        alert('error happen')
        return
      }

      updateLastMessageTime(chatRoomId, newMessageKey)

      // Scroll to bottom of the messages after adding the new message
      // if (messagesRef?.current) {
      //   const scrollElement = messagesRef.current.getScrollElement()
      //   scrollElement.scrollTo({
      //     top: messagesRef.current.el.scrollHeight,
      //     behavior: 'smooth',
      //   })
      // }
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
      <Divider />
      <ChatMessageAdd disabled={false} onSend={handleSendMessage} />
    </Box>
  )
}

ChatThread.propTypes = {
  threadKey: PropTypes.string.isRequired,
}
