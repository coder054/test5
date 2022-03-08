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

const getUnreadMessageIdsInRoomQuery = query(
  ref(database, '/chatMessages/-MtatGBZFKG4zNVIggD3'),
  orderByChild('createdAt'),
  startAt(0)
)

// const q3 = databaseReference.child(usersNode).child(userId).once().then((map) {

interface IQuote {
  text: string
  author: string
}

const TestChat = () => {
  return <TestGetChatRooms />
}

const TestGetUnreadMessageIdsInRoom = () => {
  useEffect(() => {
    // const getChatUser = async (userId) => {
    //   try {
    //     // const snapshot = await get(child(dbRef, `users/${userId}`))
    //     const snapshot = await get(child(child(dbRef, `users`), `${userId}`))

    //     const data = snapshot.val() // neu khong ton tai thi data se la null, hon nua snapshot.exist() se la false
    //     debugger
    //     const dataSample = {
    //       faceImage:
    //         'https://firebasestorage.googleapis.com:443/v0/b/zporter-dev-media/o/media%2F2021-12-19%2020:55:51.582242?alt=media&token=c140cc2c-000a-4cd2-babc-cff969cd0731',
    //       firstName: 'Anh',
    //       lastName: 'b',
    //       type: 'PLAYER',
    //       username: 'Anhb070101',
    //     }
    //   } catch (error) {
    //     debugger
    //   }
    // }

    // getChatUser('08757e74-96b7-4806-9cc5-d27f1cb4cb35')

    ;(async () => {
      // const data1 = await getChatUser('08757e74-96b7-4806-9cc5-d27f1cb4cb35')
      // const data2 = await getMessageContent(
      //   '-MtatGBZFKG4zNVIggD3',
      //   '-MtatHCFynOW0uU0oDLQ'
      // )
      // const data3 = await fromChatMessageToTypesMessage({
      // } , '')

      try {
        const a = await getUnreadMessageIdsInRoom('-MtatGBZFKG4zNVIggD3', 0)
      } catch (error) {}
    })()
  }, [])
  return null
}

const TestGetChatRooms = () => {
  const { currentRoleId } = useAuth()
  const [results, setResults] = useState<any>(null)
  const [snapshots, loading, error] = useList(
    query(ref(database, 'chatRooms'), orderByChild('updatedAt'))
  )

  useEffect(() => {
    if (isEmpty(snapshots)) {
      return
    }

    ;(async () => {
      try {
        let a1 = snapshots
          .filter((o) => {
            const chatRoom = o.val()

            return queryTabAll(chatRoom, currentRoleId)
          })
          .reverse()
        const promises = a1.map(async (o) => {
          let chatRoom: IChatRoom = o.val()
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
            chatRoom.lastMessageId || ''
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
              memberIdsList[
                memberIdsList.indexOf('11bee3f3-d7b1-4b2c-94bf-84e70f45f238')
              ]

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

        setResults(results1)
      } catch (error) {
        console.log('aaa error', getErrorMessage(error))
      }
    })()
  }, [snapshots])

  const onlyShow = useMemo(() => {
    if (isEmpty(results)) {
      return []
    }
    return results.filter((o) => o.isShowChatRoom)
  }, [results])
  useEffect(() => {
    console.log('aaa onlyShow: ', onlyShow)
  }, [onlyShow])

  return (
    <div>
      <p>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && snapshots && (
          <React.Fragment>
            <span>
              List:{' '}
              {onlyShow.map((v) => {
                console.log('aaa v', v)
                return (
                  <div className="border h-[50px] w-full mb-1 flex gap-x-[20px] ">
                    <div className="text-red-400 ">{v.chatRoomName}</div>

                    <div className="text-green-400 ">
                      {v.lastMessageContent}
                    </div>

                    <div className="text-white ">{v.updatedAt}</div>
                    <div className="text-white ">
                      {v.isGroup ? 'is group' : 'no group'}
                    </div>
                  </div>
                )
              })}
            </span>
          </React.Fragment>
        )}
      </p>
    </div>
  )
}
const TestGetUnreadChatRooms = () => {
  const { currentRoleId } = useAuth()
  const [snapshots, loading, error] = useList(
    query(ref(database, 'chatRooms'), orderByChild('updatedAt'))
  )

  useEffect(() => {
    console.log('aaa snapshots', snapshots)
    if (isEmpty(snapshots)) {
      return
    }

    let a1 = snapshots.filter((o) => {
      const chatRoom = o.val()
      console.log('aaa chatRoom11', chatRoom)
      return _queryUnreadMessage(chatRoom, currentRoleId)
    })

    // let a1 = snapshots.values()

    // let chatRoom: IChatRoom = a1.val()
    // debugger
    // let chatRoom2 = chatRoom.filter
  }, [snapshots])

  return (
    <div>
      <p>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && snapshots && <React.Fragment></React.Fragment>}
      </p>
    </div>
  )
}

export default TestChat
