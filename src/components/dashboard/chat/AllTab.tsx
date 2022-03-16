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
  IChatMessage,
  IChatRoom,
  IChatUser,
  queryTabAll,
} from 'src/module/chat/chatService'
import { AVATAR_DEFAULT, LOCAL_STORAGE_KEY } from 'src/constants/constants'

import { chain, isEmpty, shuffle } from 'lodash'
import React from 'react'
import { getErrorMessage } from 'src/utils/utils'
import { chatRoomsAtom, loadingChatRoomsAtom } from 'src/atoms/chatAtom'
import { useAtom } from 'jotai'

const database = getDatabase(firebaseApp)
const dbRef = ref(getDatabase())

export const AllTab = () => {
  const { currentRoleId } = useAuth()

  const [results, setResults] = useState<any>(null)
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
        setLoadingChatRooms(true)
        let a1 = snapshots
          .filter((o) => {
            const chatRoom = o.val()
            return queryTabAll(chatRoom, currentRoleId)
          })
          .reverse()
        const promises = a1.map(async (o) => {
          let chatRoom: IChatRoom = o.val()
          console.log('aaa chatRoom1', chatRoom)

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

          let unReadMessageNumber: number = 50

          let lastMessageContent: string = ''
          lastMessageContent = await getMessageContent(
            chatRoom.chatRoomId,
            chatRoom.lastMessageId || '',
            currentRoleId
          )

          if (!!chatRoom.chatRoomImage) {
            return Object.assign({}, chatRoom, {
              lastMessageContent: lastMessageContent,
              chatRoomImage: chatRoom.chatRoomImage,
              unReadMessageNumber: unReadMessageNumber,
              deletedDate: deletedDate,
              isShowChatRoom: isShowChatRoom,
            })
          }

          /// ================================================================
          /// Get chat room image

          let chatUser: IChatUser

          /// ================================================================
          /// Conversation 2 people
          if (!chatRoom.isGroup) {
            let memberIdsList: string[] = chatRoom.memberIds || []

            let userId: string =
              memberIdsList[memberIdsList.indexOf(currentRoleId)]

            let chatUser: IChatUser = await getChatUser(userId)

            let chatRoomImage = chatUser?.faceImage || ''

            return Object.assign({}, chatRoom, {
              lastMessageContent: lastMessageContent,
              chatRoomName:
                `${chatUser?.firstName || ''} ${chatUser?.lastName || ''}` +
                'aaa2',
              chatRoomImage: chatRoomImage,
              unReadMessageNumber: unReadMessageNumber,
              userName: chatUser?.username,
              deletedDate: deletedDate,
              isShowChatRoom: isShowChatRoom,
            })
          }

          let memberIdsList = chatRoom.memberIds || []

          /// Conversation more than 2 people
          let faceImages = [AVATAR_DEFAULT, AVATAR_DEFAULT]
          let chatRoomImage: string = ''
          if (memberIdsList.length == 1) {
            chatRoomImage = (await getChatUser(memberIdsList[0]))?.faceImage
          }

          if (memberIdsList.length >= 2) {
            memberIdsList = shuffle(memberIdsList)

            let chatUser1: IChatUser = await getChatUser(memberIdsList[0])

            faceImages[0] = chatUser1?.faceImage ?? AVATAR_DEFAULT

            let chatUser2 = await getChatUser(memberIdsList[1])
            faceImages[1] = chatUser2?.faceImage ?? AVATAR_DEFAULT
          }

          return Object.assign({}, chatRoom, {
            lastMessageContent: lastMessageContent,
            userFaceImages: faceImages,
            unReadMessageNumber: unReadMessageNumber,
            userName: chatUser?.username,
            chatRoomImage: chatRoomImage,
            deletedDate: deletedDate,
            isShowChatRoom: isShowChatRoom,
          })
        })
        const results1 = await Promise.all(promises)
        setChatRooms(results1.filter((o) => o.isShowChatRoom))
      } catch (error) {
        console.log('aaa error', getErrorMessage(error))
      } finally {
        setLoadingChatRooms(false)
      }
    })()
  }, [snapshots, currentRoleId])

  // const onlyShow = useMemo(() => {
  //   if (isEmpty(results)) {
  //     return []
  //   }
  //   return results.filter((o) => o.isShowChatRoom)
  // }, [results])

  // useEffect(() => {}, [onlyShow])

  // useEffect(() => {
  //   console.log('aaa chatRooms: ', onlyShow)
  //   setChatRooms(onlyShow)
  // }, [onlyShow])
  return null
}
