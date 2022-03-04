import { child, get, getDatabase, query, ref } from 'firebase/database'
import { isEmpty } from 'lodash'
import { firebaseApp } from 'src/config/firebase-client'
import { LOCAL_STORAGE_KEY } from 'src/constants/constants'

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
  seenMessageUIds?: any
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

enum EMessageType {
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
  description?: any
  image?: any
  link?: any
  title?: any
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
  messageId: string
): Promise<string> => {
  console.log('aaa', { chatRoomId });
  // if (chatRoomId !== 'ie9IaY34EpcpCrDXl5wc') {
  //   return ''
  // }

  if (!messageId) {
    return ''
  }
  debugger
  let content: string = ''

  ////////////////////
  const snapshot = await get(
    query(ref(database, `chatMessages/${chatRoomId}/${messageId}`))
  )
  ////////////////////

  debugger
  const chatMessage = snapshot.val()
  debugger
  if (!chatMessage) {
    debugger
    return ''
  }
  debugger

  const currentRoleId = localStorage.getItem(LOCAL_STORAGE_KEY.currentRoleId)
  debugger
  switch (chatMessage.type) {
    case EChatMessageType.text:
      content = chatMessage.text ?? ''
      break

    case EChatMessageType.image:
      if (chatMessage.createdBy == currentRoleId) {
        content = 'You sent an image'
      } else {
        content = 'Image sent to you'
      }
      break

    case EChatMessageType.custom:
      if (chatMessage.createdBy == currentRoleId) {
        content = 'You sent a video'
      } else {
        content = 'Video sent to you'
      }
      break
    case EChatMessageType.developmentLink:
      if (chatMessage.createdBy == currentRoleId) {
        content = 'You sent a development update request'
      } else {
        content = 'A development update request sent to you'
      }
      break
    case EChatMessageType.skillUpdateLink:
      if (chatMessage.createdBy == currentRoleId) {
        content = 'You sent a skill update request'
      } else {
        content = 'A skill update request sent to you'
      }
      break
    default:
      if (chatMessage.createdBy == currentRoleId) {
        content = 'You sent an attachment file'
      } else {
        content = 'An attachment file sent to you'
      }
      break
  }

  return content
}
