import { getDatabase, orderByChild, query, ref } from 'firebase/database'
import { useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useList } from 'react-firebase-hooks/database'
import {
  chatRoomsAtom,
  listRoomIdOpenFromOtherPagesAtom,
  loadingChatRoomsAtom,
} from 'src/atoms/chatAtom'
import { firebaseApp } from 'src/config/firebase-client'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { getChatRoomStream } from 'src/modules/chat/chatService'
import { getErrorMessage } from 'src/utils/utils'

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
  const [listRoomIdOpenFromOtherPages, setListRoomIdOpenFromOtherPages] =
    useAtom(listRoomIdOpenFromOtherPagesAtom)

  // useEffect(() => {
  //   if (isEmpty(snapshots) || isEmpty(currentRoleId)) {
  //     setChatRooms([])
  //     return
  //   }

  //   ;(async () => {
  //     try {
  //       if (firstRender === true) {
  //         setLoadingChatRooms(true)
  //         setFirstRender(false)
  //       }
  //       let a1 = snapshots
  //         .filter((o) => {
  //           const chatRoom = o.val()
  //           return _queryUnreadMessage(chatRoom, currentRoleId)
  //         })
  //         .reverse()
  //       const promises = a1.map(async (o) => {
  //         let chatRoom: IChatRoom = o.val()
  //         console.log('aaa chatRoom2', chatRoom)

  //         let deletedDate: number = getDeleteChatRoomDate(
  //           chatRoom,
  //           currentRoleId
  //         )
  //         let isShowChatRoom = true

  //         if (!!deletedDate) {
  //           let messageNumber = await getMessageNumber(
  //             chatRoom.chatRoomId,
  //             deletedDate
  //           )
  //           if (messageNumber === 0) {
  //             isShowChatRoom = false
  //           }
  //         }

  //         let unReadMessageNumber: number =
  //           await getNumberUnreadMessageIdsInRoom(
  //             chatRoom.chatRoomId,
  //             deletedDate,
  //             currentRoleId
  //           )

  //         let lastMessageContent: string = ''
  //         lastMessageContent = await getMessageContent(
  //           chatRoom.chatRoomId,
  //           chatRoom.lastMessageId || '',
  //           currentRoleId
  //         )

  //         /// ================================================================
  //         /// Get chat room image

  //         let chatUser: IChatUser

  //         return Object.assign({}, chatRoom, {
  //           chatRoomName: '', //
  //           chatRoomImage: '', //
  //           userName: '', //
  //           lastMessageContent: lastMessageContent, //
  //           unReadMessageNumber: unReadMessageNumber, //
  //           isShowChatRoom: isShowChatRoom,
  //         })
  //       })
  //       const results1 = await Promise.all(promises)
  //       const a11 = results1.filter(
  //         (o) => o.isShowChatRoom && (o.unReadMessageNumber || 0) > 0
  //       )
  //       debugger
  //       setChatRooms(
  //         results1.filter(
  //           (o) => o.isShowChatRoom && (o.unReadMessageNumber || 0) > 0
  //         )
  //       )
  //     } catch (error) {
  //       console.log('aaa error', getErrorMessage(error))
  //     } finally {
  //       setLoadingChatRooms(false)
  //     }
  //   })()
  // }, [snapshots, currentRoleId])

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
        const { data, error } = await getChatRoomStream(
          snapshots,
          currentRoleId,
          listRoomIdOpenFromOtherPages
        )

        setChatRooms(
          data.filter((o) => o.isShowChatRoom && o.unReadMessageNumber > 0)
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
