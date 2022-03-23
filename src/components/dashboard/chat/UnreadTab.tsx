import type { NextPage } from 'next'
import {
  ref,
  getDatabase,
  query,
  orderByChild,
  equalTo,
  get,
  child,
  startAt,
  onValue,
  limitToFirst,
  limitToLast,
  orderByKey,
  orderByValue,
  startAfter,
} from 'firebase/database'
import { useList } from 'react-firebase-hooks/database'
import { firebaseApp } from 'src/config/firebase-client'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import {
  fromChatMessageToTypesMessage,
  getChatUser,
  getDeleteChatRoomDate,
  getMessageContent,
  getMessageNumber,
  getNumberUnreadMessageIdsInRoom,
  getUnreadMessageIdsInRoom,
  IChatMessage,
  IChatRoom,
  IChatUser,
  _queryUnreadMessage,
} from 'src/module/chat/chatService'
import { AVATAR_DEFAULT, LOCAL_STORAGE_KEY } from 'src/constants/constants'

import { chain, isEmpty, shuffle } from 'lodash'
import React from 'react'
import { getErrorMessage } from 'src/utils/utils'
import { chatRoomsAtom, loadingChatRoomsAtom } from 'src/atoms/chatAtom'
import { useAtom } from 'jotai'

const database = getDatabase(firebaseApp)
const dbRef = ref(getDatabase())

export const UnreadTab = () => {
  const { currentRoleId } = useAuth()

  const [results, setResults] = useState<any>(null)
  const [firstRender, setFirstRender] = useState(true)
  const [snapshots, loading, error] = useList(
    query(ref(database, 'chatRooms'), orderByChild('updatedAt'))
  )
  const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom)
  const [, setLoadingChatRooms] = useAtom(loadingChatRoomsAtom)

  useEffect(() => {
    if (isEmpty(snapshots) || isEmpty(currentRoleId)) {
      setChatRooms([])
      return
    }

    ;(async () => {
      try {
        if (firstRender === true) {
          setLoadingChatRooms(true)
          setFirstRender(false)
        }
        let a1 = snapshots
          .filter((o) => {
            const chatRoom = o.val()
            return _queryUnreadMessage(chatRoom, currentRoleId)
          })
          .reverse()
        const promises = a1.map(async (o) => {
          let chatRoom: IChatRoom = o.val()
          console.log('aaa chatRoom2', chatRoom)

          let deletedDate: number = getDeleteChatRoomDate(
            chatRoom,
            currentRoleId
          )
          let isShowChatRoom = true

          if (!!deletedDate) {
            let messageNumber = await getMessageNumber(
              chatRoom.chatRoomId,
              deletedDate
            )
            if (messageNumber === 0) {
              isShowChatRoom = false
            }
          }

          let unReadMessageNumber: number =
            await getNumberUnreadMessageIdsInRoom(
              chatRoom.chatRoomId,
              deletedDate,
              currentRoleId
            )

          let lastMessageContent: string = ''
          lastMessageContent = await getMessageContent(
            chatRoom.chatRoomId,
            chatRoom.lastMessageId || '',
            currentRoleId
          )

          /// ================================================================
          /// Get chat room image

          let chatUser: IChatUser

          return Object.assign({}, chatRoom, {
            chatRoomName: '', //
            chatRoomImage: '', //
            userName: '', //
            lastMessageContent: lastMessageContent, //
            unReadMessageNumber: unReadMessageNumber, //
            isShowChatRoom: isShowChatRoom,
          })
        })
        const results1 = await Promise.all(promises)
        const a11 = results1.filter(
          (o) => o.isShowChatRoom && (o.unReadMessageNumber || 0) > 0
        )
        debugger
        setChatRooms(
          results1.filter(
            (o) => o.isShowChatRoom && (o.unReadMessageNumber || 0) > 0
          )
        )
      } catch (error) {
        console.log('aaa error', getErrorMessage(error))
      } finally {
        setLoadingChatRooms(false)
      }
    })()
  }, [snapshots, currentRoleId])

  return null
}
