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
  DataSnapshot,
} from 'firebase/database'
import { useList } from 'react-firebase-hooks/database'
import { firebaseApp } from 'src/config/firebase-client'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import {
  fromChatMessageToTypesMessage,
  getChatRoomStream,
  getChatUser,
  getDeleteChatRoomDate,
  getMessageContent,
  getMessageNumber,
  getNumberUnreadMessageIdsInRoom,
  getRequestedChatRoomStream,
  getUnreadMessageIdsInRoom,
  IChatMessage,
  IChatRoom,
  IChatUser,
  queryTabAll,
  requestedChatRoomsNode,
} from 'src/modules/chat/chatService'
import { AVATAR_DEFAULT, LOCAL_STORAGE_KEY } from 'src/constants/constants'

import { chain, isEmpty, shuffle } from 'lodash'
import React from 'react'
import { getErrorMessage } from 'src/utils/utils'
import { chatRoomsAtom, loadingChatRoomsAtom } from 'src/atoms/chatAtom'
import { useAtom } from 'jotai'

const database = getDatabase(firebaseApp)
const dbRef = ref(getDatabase())

export const RequestsTab = () => {
  const { currentRoleId } = useAuth()

  const [results, setResults] = useState<any>(null)
  const [firstRender, setFirstRender] = useState(true)
  const [snapshots, loading, error] = useList(
    query(ref(database, requestedChatRoomsNode), orderByChild('updatedAt'))
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
        const { data, error } = await getRequestedChatRoomStream(
          snapshots,
          currentRoleId
        )

        setChatRooms(data)
      } catch (error) {
      } finally {
        setLoadingChatRooms(false)
      }
    })()
  }, [snapshots, currentRoleId])

  return null
}
