import {
  child,
  get,
  orderByChild,
  query,
  ref,
  update,
  startAt,
} from 'firebase/database'
import { chain, isEmpty } from 'lodash'
import { LOCAL_STORAGE_KEY } from 'src/constants/constants'
import { database, dbRef, IChatMessage } from './chatService'

export interface IUnReadMessage {
  messageId: string
  seenUserIds: string[]
}

export const createMessage = async (
  message: IChatMessage,
  chatRoomId: string
): Promise<void> => {
  // try {
  //   let listReadMessages: IUnReadMessage
  //   listReadMessages = await getUnreadMessageIdsInRoom(chatRoomId)

  //   if (  !isEmpty(listReadMessages)  ) {
  //     DatabaseReference ref =
  //         databaseReference.child('chatMessages').child(chatRoomId);
  //     final map = {
  //       for (var readMessage in listReadMessages)
  //         '${readMessage.messageId}/$seenMessageUIdsNode':
  //             readMessage.seenUserIds
  //     };
  //     await ref.update(map);
  //     int number = await getUnreadChatRoomNumber;
  //     MessageStream.shared.updateMessageNumber(number);
  //     }
  // } catch (error) {}

  try {
    const updates = {}
    updates[`/chatMessages/${chatRoomId}/${message.messageId}`] = message
    await update(dbRef, updates)
  } catch (error) {}
}

export const updateMessageStatus = async (chatRoomId: string) => {
  try {
    let listReadMessages: IUnReadMessage[]
    listReadMessages = await getUnreadMessageIdsInRoom(chatRoomId)

    if (!isEmpty(listReadMessages)) {
      const updates = {}
      listReadMessages.forEach((readMessage) => {
        updates[
          `/chatMessages/${chatRoomId}/${readMessage.messageId}/seenMessageUIds`
        ] = readMessage.seenUserIds
      })

      await update(dbRef, updates)
      // TODO
      // let number: number
      // number = await getUnreadChatRoomNumber()
      // MessageStream.shared.updateMessageNumber(number)
    }
  } catch (error) {}
}

export const getUnreadMessageIdsInRoom = async (
  chatRoomId: string,
  start: number = 0
): Promise<IUnReadMessage[]> => {
  let listReadMessages: IUnReadMessage[]
  const snapshot = await get(child(dbRef, `chatMessages/${chatRoomId}`))

  if (!snapshot.exists()) {
    return
  }

  let a1 = snapshot.val()

  ////////////////////
  try {
    const currentUserId =
      localStorage.getItem(LOCAL_STORAGE_KEY.currentRoleId) || ''
    const snapShot = await get(
      query(
        ref(database, '/chatMessages/-MtatGBZFKG4zNVIggD3'),
        orderByChild('createdAt'),
        startAt(start)
      )
    )
    let data = snapShot.val() as IChatMessage
    if (!data) {
      return
    }

    const data2 = Object.values(data).filter(
      (message) => message.createdBy !== currentUserId
    )

    const listReadMessages = []
    data2.forEach((message) => {
      const unReadMessage: IUnReadMessage = {
        messageId: message.messageId,
        seenUserIds: chain([currentUserId, ...(message.seenMessageUIds || [])])
          .compact()
          .uniq()
          .value(),
      }
      listReadMessages.push(unReadMessage)
    })
    return listReadMessages
  } catch (error) {
    throw error
  }
  ////////////////////
}
