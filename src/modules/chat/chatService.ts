import queryString from 'query-string'
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
  update,
  serverTimestamp,
  push,
  DataSnapshot,
} from 'firebase/database'
import {
  ref as storageLibRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import { storage } from 'src/config/firebase-client'

import { firebaseApp } from 'src/config/firebase-client'

import { chain, isEmpty, get as getLodash, shuffle } from 'lodash'
import { AVATAR_DEFAULT, LOCAL_STORAGE_KEY } from 'src/constants/constants'
import axios from 'axios'

export const database = getDatabase(firebaseApp)
export const dbRef = ref(database)

export const Constants = {
  DEVELOPMENT_LINK: 'DEVELOPMENT_LINK',
  SKILL_UPDATE_LINK: 'SKILL_UPDATE_LINK',
}

export const chatRoomsNode = 'chatRooms'
export const chatMessagesNode = 'chatMessages'
export const chatRoomIdNode = 'chatRoomId'
export const chatRoomNameNode = 'chatRoomName'
export const createdAtNode = 'createdAt'
export const updatedAtNode = 'updatedAt'
export const memberIdsNode = 'memberIds'
export const usersNode = 'users'
export const seenMessageUIdsNode = 'seenMessageUIds'
export const lastMessageIdNode = 'lastMessageId'
export const isGroupNode = 'isGroup'
export const requestedNode = 'requested'
export const requestedUIDNode = 'requestedUID'
export const requestedChatRoomsNode = 'requestedChatRooms'
export const blockedByUIDsNode = 'blockedByUIDs'
export const deletedAtNode = 'deletedAt'
export const chattingUIDsNode = 'chattingUIDs'
export const previewDataNode = 'previewData'

export interface IChatRoom {
  aaa: number
  chatRoomId: string
  memberIds: string[]
  updatedAt: number
  requested?: boolean // defaul false
  chatRoomName?: string
  lastMessageId?: string
  chatRoomImage?: string
  lastMessageContent?: string
  unReadMessageNumber?: number
  userFaceImages?: string[]
  userName?: string
  isGroup?: boolean // default false
  requestedUID?: string
  blockedByUIDs?: string[]
  chattingUIDs?: string[]
  deletedDate?: number
  isShowChatRoom?: boolean // defauld true
  roomType?: ERoomType
}

export enum ERoomType {
  GROUP = 'GROUP',
  TEAM = 'TEAM',
}

export interface IUser {
  createdAt: number
  firstName: string
  id: any
  imageUrl: any
  lastSeen: number
  metadata: any // object
  role: any
  updatedAt: any
}
export interface IChatMessage {
  messageId: any
  createdBy: any
  createdAt: any
  attachmentName?: any
  text?: any
  type?: any
  status?: any
  uri?: any
  size?: any
  seenMessageUIds?: string[]
  thumbVideo?: any
  previewData?: any
  teamResponse?: any
}

export interface IMessage {
  author?: any
  createdAt?: any
  id?: any
  metadata?: any
  remoteId?: any
  roomId?: any
  status?: any
  type?: any
  updatedAt?: any
}

export enum EChatMessageType {
  custom = 'custom',
  file = 'file',
  image = 'image',
  text = 'text',
  developmentLink = 'developmentLink',
  skillUpdateLink = 'skillUpdateLink',
  unsupported = 'unsupported',
}

export enum EMessageType {
  custom = 'custom',
  file = 'file',
  image = 'image',
  text = 'text',
  unsupported = 'unsupported',
}

export enum EStatus {
  delivered = 'delivered',
  error = 'error',
  seen = 'seen',
  sending = 'sending',
  sent = 'sent',
}

export interface ICustomMessage extends IMessage {
  author: IUser
  createdAt?: number
  id: string
  metadata?: any
  remoteId?: string
  roomId?: string
  status?: EStatus
  type?: EMessageType
  updatedAt?: number
}
export interface IImageMessage extends IMessage {
  messageId?: string
  createdBy?: string
  attachmentName?: string
  author: IUser
  createdAt?: number
  height?: any
  id: string
  metadata: any
  name: any
  remoteId?: string
  roomId?: string
  size: any
  status?: EStatus
  type?: EMessageType
  updatedAt?: number
  uri: any
  width?: any
}

export interface IFileMessage extends IMessage {
  author: IUser
  createdAt?: number
  id: string
  metadata?: any
  mimeType?: any
  name: any
  remoteId?: string
  roomId?: string
  size: any
  status?: EStatus
  type?: EMessageType
  updatedAt?: number
  uri: any
}

export interface ITextMessage extends IMessage {
  author: IUser
  createdAt?: number
  id: string
  metadata?: any
  previewData?: any
  remoteId?: string
  roomId?: string
  status?: EStatus
  text: any
  type?: EMessageType

  updatedAt?: number
}

export interface IPreviewData {
  description?: string
  image?: IPreviewDataImage
  link?: string
  title?: string
}

export interface IPreviewDataImage {
  height: any
  url: any
  width: any
}

export interface IChatUser {
  userId?: string
  faceImage?: string
  firstName?: string
  lastName?: string
  type?: string
  username?: string
  presence: boolean
}

export const fromChatMessageToTypesMessage = (
  author: IUser,
  chatMessage: IChatMessage
): IMessage => {
  switch (chatMessage.type) {
    case EChatMessageType.custom: // basically a video message
      let customMessage: ICustomMessage = {
        id: chatMessage.messageId,
        author: author,
        status: messageStatusConverter(
          chatMessage.seenMessageUIds,
          chatMessage.status
        ),
        type: EMessageType.custom,
        metadata: {
          uri: chatMessage.uri ?? '',
          type: 'VIDEO',
          thumbVideo: chatMessage.thumbVideo || '',
          seenMessageUIds: chatMessage.seenMessageUIds ?? [],
        },
        createdAt: chatMessage.createdAt,
      }

      return customMessage
      break

    case EChatMessageType.image:
      const imageMessage: IImageMessage = {
        id: chatMessage.messageId,
        author: author,
        name: chatMessage.attachmentName ?? 'File',
        size: chatMessage.size ?? 1,
        status: messageStatusConverter(
          chatMessage.seenMessageUIds,
          chatMessage.status
        ),
        type: EMessageType.image,
        uri: chatMessage.uri ?? '',
        createdAt: chatMessage.createdAt,
        metadata: {
          seenMessageUIds: chatMessage.seenMessageUIds ?? [],
        },
      }
      return imageMessage
      break

    case EChatMessageType.file:
      const fileMessage: IFileMessage = {
        id: chatMessage.messageId,
        author: author,
        name: chatMessage.attachmentName ?? 'File',
        size: chatMessage.size ?? 1,
        status: messageStatusConverter(
          chatMessage.seenMessageUIds,
          chatMessage.status
        ),
        type: EMessageType.file,
        uri: chatMessage.uri ?? '',
        createdAt: chatMessage.createdAt,
        metadata: {
          seenMessageUIds: chatMessage.seenMessageUIds ?? [],
        },
      }
      return fileMessage
      break

    case EChatMessageType.developmentLink:
      const developmentLinkMessage: ICustomMessage = {
        id: chatMessage.messageId,
        author: author,
        status: messageStatusConverter(
          chatMessage.seenMessageUIds,
          chatMessage.status
        ),
        type: EMessageType.custom,
        metadata: {
          type: Constants.DEVELOPMENT_LINK,
          teamResponse: chatMessage.teamResponse,
          seenMessageUIds: chatMessage.seenMessageUIds ?? [],
        },
        createdAt: chatMessage.createdAt,
      }
      return developmentLinkMessage
      break

    case EChatMessageType.skillUpdateLink:
      const skillUpdateMessage: ICustomMessage = {
        id: chatMessage.messageId,
        author: author,
        status: messageStatusConverter(
          chatMessage.seenMessageUIds,
          chatMessage.status
        ),
        type: EMessageType.custom,
        metadata: {
          type: Constants.SKILL_UPDATE_LINK,
          teamResponse: chatMessage.teamResponse,
          seenMessageUIds: chatMessage.seenMessageUIds ?? [],
        },
        createdAt: chatMessage.createdAt,
      }
      return skillUpdateMessage
      break

    /////////////////////////////////
    default:
      const imagePreview: IPreviewDataImage = {
        width: chatMessage.previewData?.image?.width ?? 0,
        height: chatMessage.previewData?.image?.height ?? 0,
        url: chatMessage.previewData?.image?.url ?? '',
      }
      const previewData: IPreviewData = {
        title: chatMessage.previewData?.title,
        description: chatMessage.previewData?.description,
        link: chatMessage.previewData?.link,
        image: imagePreview,
      }
      const textMessage: ITextMessage = {
        id: chatMessage.messageId,
        author: author,
        text: chatMessage.text ?? '',
        status: messageStatusConverter(
          chatMessage.seenMessageUIds,
          chatMessage.status
        ),
        type: EMessageType.text,
        createdAt: chatMessage.createdAt,
        previewData: chatMessage.previewData != null ? previewData : null,
        metadata: {
          seenMessageUIds: chatMessage.seenMessageUIds ?? [],
        },
      }
      return textMessage
    /////////////////////////////////
  }
}

export const messageStatusConverter = (
  seenMessageUIds: string[],
  status: EStatus
): EStatus => {
  if (status == EStatus.sending) {
    return EStatus.sending
  }
  if (!isEmpty(seenMessageUIds)) {
    return EStatus.seen
  } else {
    return EStatus.sent
  }
}

export const getChatUser = async (userId: string): Promise<IChatUser> => {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`))
    const chatUser = snapshot.val()
    const dataSample = {
      faceImage:
        'https://firebasestorage.googleapis.com:443/v0/b/zporter-dev-media/o/media%2F2021-12-19%2020:55:51.582242?alt=media&token=c140cc2c-000a-4cd2-babc-cff969cd0731',
      firstName: 'Anh',
      lastName: 'b',
      type: 'PLAYER',
      username: 'Anhb070101',
    }
    if (chatUser) {
      return Object.assign({}, chatUser, { userId })
    }
  } catch (error) {}
}

export const getMessageContent = async (
  chatRoomId: string,
  messageId: string,
  userId: string
): Promise<string> => {
  // if (chatRoomId !== 'ie9IaY34EpcpCrDXl5wc') {
  //   return ''
  // }

  if (!messageId) {
    return ''
  }

  let content: string = ''

  ////////////////////
  const snapshot = await get(
    query(ref(database, `chatMessages/${chatRoomId}/${messageId}`))
  )
  ////////////////////

  const chatMessage = snapshot.val()

  if (!chatMessage) {
    return ''
  }

  switch (chatMessage.type) {
    case EChatMessageType.text:
      content = chatMessage.text ?? ''
      break

    case EChatMessageType.image:
      if (chatMessage.createdBy == userId) {
        content = 'You sent an image'
      } else {
        content = 'Image sent to you'
      }
      break

    case EChatMessageType.custom:
      if (chatMessage.createdBy == userId) {
        content = 'You sent a video'
      } else {
        content = 'Video sent to you'
      }
      break
    case EChatMessageType.developmentLink:
      if (chatMessage.createdBy == userId) {
        content = 'You sent a development update request'
      } else {
        content = 'A development update request sent to you'
      }
      break
    case EChatMessageType.skillUpdateLink:
      if (chatMessage.createdBy == userId) {
        content = 'You sent a skill update request'
      } else {
        content = 'A skill update request sent to you'
      }
      break
    default:
      if (chatMessage.createdBy == userId) {
        content = 'You sent an attachment file'
      } else {
        content = 'An attachment file sent to you'
      }
      break
  }

  return content
}

export const queryTabAll = (chatRoom: IChatRoom, userId: string): boolean => {
  // userId: roleId

  if ((chatRoom.blockedByUIDs || []).includes(userId)) {
    return false
  }

  /// Filter group chat having last message
  /// And user's in group
  /// Display chat room that this user request to send message
  return (
    (chatRoom.memberIds || []).includes(userId) &&
    // !!chatRoom.lastMessageId &&
    (!chatRoom.requestedUID || chatRoom.requestedUID === userId)
  )
}

export const getDeleteChatRoomDate = (value: any, userId: string): number => {
  let deletedDate: number = 0

  if (!!value['deletedAt']) {
    const arr = Object.entries(value['deletedAt'])

    arr.forEach(([key, v]: [key: string, v: number]) => {
      if (key === userId) {
        deletedDate = v
      }
    })
  }

  return deletedDate
}

export const getMessageNumber = async (
  chatRoomId: string,
  startAt?: number
): Promise<number> => {
  let number = 0
  let dataSnapshot = await get(
    query(
      ref(database, `chatMessages/${chatRoomId}`),
      orderByChild('createdAt'),
      startAfter(startAt - 1)
    )
  )

  if (dataSnapshot.exists) {
    let messageMap = dataSnapshot.val()
    if (isEmpty(messageMap)) {
      return 0
    }
    for (let i = 0; i < messageMap.length; i++) {
      number++
      if (number >= 1) {
        return number
      }
    }
  }

  return number
}

export const _queryUnreadMessage = (
  chatRoom: IChatRoom,
  userId: string
): boolean => {
  /// Filter group chat having last message
  /// And user's in group
  if ((chatRoom.blockedByUIDs || []).includes(userId)) {
    return false
  }

  return (
    (chatRoom.memberIds || []).includes(userId) &&
    chatRoom.lastMessageId != null
  )
}

export interface IUnReadMessage {
  messageId: string
  seenUserIds: string[]
}

export const createMessage = async (
  message: IChatMessage,
  chatRoomId: string
): Promise<{ error: boolean }> => {
  try {
    const updates = {}
    updates[`/chatMessages/${chatRoomId}/${message.messageId}`] = message
    await update(dbRef, updates)
    return { error: false }
  } catch (error) {
    return { error: true }
  }
}

export const updateMessageStatus = async (
  chatRoomId: string,
  userId: string
) => {
  try {
    let listReadMessages: IUnReadMessage[]
    listReadMessages = await getUnreadMessageIdsInRoom(chatRoomId, 0, userId)

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
  start: number = 0,
  userId: string
): Promise<IUnReadMessage[]> => {
  try {
    let listReadMessages: IUnReadMessage[] = []
    const snapShot = await get(
      query(
        ref(database, `chatMessages/${chatRoomId}`),
        orderByChild('createdAt'),
        startAt(start)
      )
    )
    let data = snapShot.val() as IChatMessage
    if (!data) {
      return
    }

    const data2 = Object.values(data).filter(
      (message) => message.createdBy !== userId
    )
    data2.forEach((chatMessage) => {
      if (chatMessage.createdBy != userId) {
        if (!!chatMessage.seenMessageUIds) {
          if (!chatMessage.seenMessageUIds.includes(userId)) {
            let target: IUnReadMessage = {
              messageId: chatMessage.messageId,
              seenUserIds: [...chatMessage.seenMessageUIds, userId || ''],
            }
            listReadMessages.push(target)
          }
        } else {
          let target: IUnReadMessage = {
            messageId: chatMessage.messageId,
            seenUserIds: [userId || ''],
          }
          listReadMessages.push(target)
        }
      }
    })

    return listReadMessages
  } catch (error) {
    return []
  }
  ////////////////////
}

export const getNumberUnreadMessageIdsInRoom = async (
  chatRoomId: string,
  start: number = 0,
  userId: string
): Promise<number> => {
  const list = await getUnreadMessageIdsInRoom(chatRoomId, start, userId)
  return getLodash(list, 'length') || 0
}

/// ==========================================================================
/// Update last message id and updatedAt field on chat room
export const updateLastMessageTime = async (
  chatRoomId: string,
  lastMessageId?: string,
  updatedAt?: number
): Promise<{ error: boolean }> => {
  try {
    /////////////////// update in chatRooms table

    const snapshot = await get(query(ref(database, `/chatRooms/${chatRoomId}`)))
    if (!snapshot.exists()) {
      return
    }

    const updatesChatRoom = {}
    updatesChatRoom[`/chatRooms/${chatRoomId}`] = Object.assign(
      {},
      snapshot.val(),
      {
        lastMessageId,
        updatedAt: updatedAt || serverTimestamp(),
      }
    )
    await update(dbRef, updatesChatRoom)
    /////////////////// update in chatRooms table end

    /////////////////// update in requestedChatRooms table
    const snapshot2 = await get(
      query(ref(database, `/requestedChatRooms/${chatRoomId}`))
    )
    if (!snapshot2.exists()) {
      return
    }
    const updatesRequestedChatRoom = {}
    updatesRequestedChatRoom[`/requestedChatRooms/${chatRoomId}`] =
      Object.assign({}, snapshot2.val(), {
        lastMessageId,
        updatedAt: updatedAt || serverTimestamp(),
      })
    await update(dbRef, updatesRequestedChatRoom)
    /////////////////// update in requestedChatRooms table end

    return { error: false }
  } catch (error) {
    alert(error)
    return { error: true }
  }
}

export const createChatRoom = async (
  requested: boolean,
  receiverId: string,
  userId: string
): Promise<string> => {
  return ''
}

export const createGroupChatRoom = async (
  groupChatId: string,
  groupName: string,
  requested: boolean,
  memberIds: string[],
  chatRoomImage?: string,
  //@ts-ignore: Unreachable code error
  roomType: ERoomType
) => {
  try {
    const chatRoom: IChatRoom = {
      memberIds,
      requested,
      //@ts-ignore: Unreachable code error
      updatedAt: serverTimestamp(),
      chatRoomId: groupChatId,
      chatRoomName: groupName,
      chatRoomImage,
      isGroup: true,
      roomType,
    }

    const updates = {}
    updates[`/chatRooms/${groupChatId}/`] = chatRoom

    await update(dbRef, updates)

    // return newChatRoomKey
  } catch (error) {}
}

export const uploadFile = async (
  file: File | Blob,
  storageFolder: string, // no need slash
  fileName: string
): Promise<{ error: boolean; url: string }> => {
  try {
    if (!file) {
      return {
        error: true,
        url: '',
      }
    }
    const storageRef = storageLibRef(storage, `/${storageFolder}/${fileName}`)
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snapshot.ref)

    return {
      error: false,
      url,
    }
  } catch (error) {
    return {
      error: true,
      url: '',
    }
  }
}

export const newChatMessage = () => {
  const newTextMessage = (
    messageId: string,
    text: string,
    createdBy: string,
    createdAt: string
  ) => {
    let message: ITextMessage = {
      //@ts-ignore: Unreachable code error
      createdAt,
      createdBy,
      messageId,
      text,
      type: EMessageType.text,
    }

    return message
  }

  const newImageMessage = (
    messageId,
    createdBy,
    createdAt,
    uri,
    size: number,
    attachmentName: string
  ): IChatMessage => {
    const target: IChatMessage = {
      attachmentName,
      createdAt,
      createdBy,
      messageId,
      size,
      type: EMessageType.image,
      uri,
    }
    return target
  }

  const newVideoMessage = (
    attachmentName: string,
    createdAt: any,
    createdBy: string,
    messageId: string,
    thumbVideo: string,
    uri: string
  ) => {
    return {
      attachmentName,
      createdAt,
      createdBy,
      messageId,
      thumbVideo,
      type: 'custom',
      uri,
    }
  }

  const newFileMessage = (
    attachmentName: string,
    createdAt: any,
    createdBy: string,
    messageId: string,
    uri: string,
    size: number
  ) => {
    return {
      attachmentName,
      createdAt,
      createdBy,
      messageId,
      size,
      type: 'file',
      uri,
    }
  }

  const newLinkMessage = (
    createdAt: any,
    createdBy: string,
    messageId: string,
    text: string,
    previewData: IPreviewData
  ) => {
    return {
      createdAt,
      createdBy,
      messageId,
      previewData,
      text,
      type: 'text',
    }
  }

  return {
    newTextMessage,
    newImageMessage,
    newVideoMessage,
    newFileMessage,
    newLinkMessage,
  }
}

export const fromBase64ToBlob = async (base64: string): Promise<Blob> => {
  const res = await fetch(base64)
  const blob = await res.blob()
  return blob
}

export const updateMessagePreviewData = async (
  messageId: string,
  chatRoomId: string,
  previewData: IPreviewData
): Promise<{ error: boolean }> => {
  try {
    const updates = {}
    updates[`/chatMessages/${chatRoomId}/${messageId}/previewData`] =
      previewData
    await update(dbRef, updates)
    return { error: false }
  } catch (error) {
    return { error: true }
  }
}

export const getPreviewData = async (
  url: string
): Promise<{
  error: boolean
  data: {
    description: string
    hostname: string
    image: string
    siteName: string
    title: string
    url: string
  }
}> => {
  try {
    const params = {
      url: url,
    }

    const resp = await axios.get(
      `https://rlp-proxy.herokuapp.com/v2?${queryString.stringify(params)}`
    )

    return {
      error: false,
      //@ts-ignore: Unreachable code error
      data: getLodash(resp, 'data.metadata'),
    }
  } catch (error) {
    return {
      error: false,
      data: null,
    }
  }
}
export const getChatRoomStream = async (
  snapshots: DataSnapshot[],
  userId: string
) => {
  try {
    let a1 = snapshots
      .filter((o) => {
        const chatRoom = o.val()
        return queryTabAll(chatRoom, userId)
      })
      .reverse()
    const promises = a1.map(async (o) => {
      let chatRoom: IChatRoom = o.val()

      let deletedDate: number = getDeleteChatRoomDate(chatRoom, userId)
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

      let unReadMessageNumber: number = await getNumberUnreadMessageIdsInRoom(
        chatRoom.chatRoomId,
        deletedDate,
        userId
      )

      let lastMessageContent: string = ''
      lastMessageContent = await getMessageContent(
        chatRoom.chatRoomId,
        chatRoom.lastMessageId || '',
        userId
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

        let id: string = memberIdsList[memberIdsList.indexOf(userId)]

        let chatUser: IChatUser = await getChatUser(id)

        let chatRoomImage = chatUser?.faceImage || ''

        return Object.assign({}, chatRoom, {
          lastMessageContent: lastMessageContent,
          chatRoomName:
            `${chatUser?.firstName || ''} ${chatUser?.lastName || ''}` + 'aaa2',
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
    return {
      error: false,
      data: results1,
    }
  } catch (error) {
    return { error: true, data: [] }
  }
}

export const getUrlChatFromChatRoomId = (roomId: string) => {
  return `/dashboard/chat?roomId=${roomId}`
}
