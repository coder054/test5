import type { NextPage } from 'next'
import {
  useQueryParam,
  NumberParam,
  StringParam,
  withDefault,
} from 'use-query-params'
import { useObject } from 'react-firebase-hooks/database'
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
  getUnreadMessageIdsInRoom,
  IChatMessage,
  IChatRoom,
  IChatUser,
  queryTabAll,
  _queryUnreadMessage,
} from 'src/module/chat/chatService'
import { AVATAR_DEFAULT, LOCAL_STORAGE_KEY } from 'src/constants/constants'

import { chain, isEmpty, shuffle } from 'lodash'
import React from 'react'
import { getErrorMessage } from 'src/utils/utils'

const database = getDatabase(firebaseApp)
const dbRef = ref(getDatabase())

const q1 = query(ref(database, 'chatRooms'), orderByChild('updatedAt'))
const q2 = query(
  ref(database, 'chatRooms'),
  orderByChild('updatedAt'),
  equalTo(1642405928401)
)

const TestChat = () => {
  const [id, setId] = useQueryParam('id', StringParam)

  // ie9IaY34EpcpCrDXl5wc
  // 4hZjBm7zmUQlDPXJIWa7
  const [snapshot, loading, error] = useObject(
    ref(database, `chatMessages/${id}`)
  )

  useEffect(() => {
    if (!!snapshot) {
      if (snapshot.exists()) {
        console.log('aaa snapshot: ', snapshot.val())
      }
    }
  }, [snapshot])

  return (
    <div
      onClick={() => {
        if (id === '4hZjBm7zmUQlDPXJIWa7') {
          setId('ie9IaY34EpcpCrDXl5wc')
        } else {
          setId('4hZjBm7zmUQlDPXJIWa7')
        }
      }}
      className="text-red-400 "
    >
      TestChat
    </div>
  )
}

export default TestChat
