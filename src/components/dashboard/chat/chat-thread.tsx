import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isEmpty } from 'lodash'
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
} from 'firebase/database'
import { useObject } from 'react-firebase-hooks/database'
import { database, IChatRoom } from 'src/module/chat/chatService'

interface ChatThreadProps {}

const threadSelector = (state: RootState): Thread | undefined => {
  const { threads, activeThreadId } = state.chat

  return threads.byId[activeThreadId]
}

export const ChatThread: FC<ChatThreadProps> = (props) => {
  const threadKey = ''
  const [activeChatRoom] = useAtom(activeChatRoomAtom) as unknown as [
    activeChatRoom: IChatRoom
  ]

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

    let arrMessages = arr.map(([key, value]) => {
      return value
    })

    console.log('aaa arrMessages', arrMessages)
    return arrMessages
  }, [snapshot])

  useEffect(() => {
    console.log('aaa activeChatRoom.deletedDate: ', activeChatRoom.deletedDate)
  }, [activeChatRoom])

  useEffect(() => {
    console.log('aaa error: ', error)
  }, [error])

  // useEffect(() => {
  //   // Scroll to bottom of the messages after loading the thread
  //   if (thread?.messages && messagesRef?.current) {
  //     const scrollElement = messagesRef.current.getScrollElement()

  //     scrollElement.scrollTop = messagesRef.current.el.scrollHeight
  //   }
  // }, [thread])

  // If we have the thread, we use its ID to add a new message
  // Otherwise we use the recipients IDs. When using participant IDs, it means that we have to
  // get the thread.
  const handleSendMessage = async (body: string): Promise<void> => {
    try {
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
          <ChatMessages messages={messages} participants={[]} />
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
